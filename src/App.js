import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- ICONS ---
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ShoppingBagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const FilmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;


// --- Data ---
const ALL_PRODUCTS = [
  { id: 'wash', name: "Beard Brothas' Beard Wash", description: "Cleanses without stripping natural oils.", price: "15.99", url: "https://beardbrothas.com/Beard-Wash-c73000019", type: 'product' },
  { id: 'oil', name: "Beard Brothas' Beard Oil", description: "Our signature blend for daily hydration and health.", price: "17.99", url: "https://beardbrothas.com/Beard-Oils-c44673539", type: 'product' },
  { id: 'balm', name: "Beard Brothas' Beard Balm", description: "Provides hold and shapes your beard.", price: "19.99", url: "https://beardbrothas.com/Beard-Balms-c44673540", type: 'product' },
  { id: 'head_balm', name: "Beard Brothas' Bald Head Balm", description: "Soothes and moisturizes the scalp.", price: "19.99", url: "https://beardbrothas.com/Bald-Head-Moisturizers-c44676609", type: 'product' },
  { id: 'comb', name: "Beard Brothas' Peachwood Beard Comb", description: "Detangles without causing frizz.", price: "12.99", url: "https://beardbrothas.com/Beard-Brothas-Peach-Wood-Beard-Comb-p218893033", type: 'tool' },
  { id: 'brush', name: "Beard Brothas' Boar Bristle Brush", description: "Distributes oils and exfoliates the skin.", price: "15.99", url: "https://beardbrothas.com/Beard-Brothas-Black-Wood-Beard-Brush-p218876280", type: 'tool' },
  { id: 'pick', name: "Beard Brothas' Wood Beard Pick", description: "For lifting and adding volume to long beards.", price: "16.99", url: "https://beardbrothas.com/Beard-Brothas-Wooden-Beard-Pick-p517229377", type: 'tool' },
];

const ARTICLES = [
    { id: 1, title: "How to Use Beard Oil the Right Way", content: `<p class="mb-4">So you've got your bottle of Beard Brothas' Beard Oil, but are you using it to its full potential? Applying beard oil is simple, but a few key steps can make a huge difference in the health and appearance of your beard.</p><h3 class="text-xl font-bold text-amber-500 mb-2">1. Start with a Clean, Damp Beard</h3><p class="mb-4">The best time to apply beard oil is right after a warm shower. The steam opens up your pores and hair follicles, allowing the oil to be absorbed more effectively. Gently pat your beard dry with a towel – you want it damp, not soaking wet.</p><h3 class="text-xl font-bold text-amber-500 mb-2">2. Get the Amount Right</h3><p class="mb-4">This is crucial. Our app's routine generator gives you a personalized starting point based on your beard length. Dispense that amount into your palm.</p><h3 class="text-xl font-bold text-amber-500 mb-2">3. Warm It Up & Apply to Skin</h3><p class="mb-4">Rub your hands together to warm the oil. Then, work your fingertips into your beard, making sure to massage the oil directly onto the skin underneath. This is the most important step! Healthy skin is the foundation of a healthy beard. It prevents dryness, flaking, and itchiness.</p><h3 class="text-xl font-bold text-amber-500 mb-2">4. Distribute Through Your Beard</h3><p class="mb-4">Once you've massaged your skin, work the remaining oil on your hands through the length of your beard hair, from root to tip. This will help to soften the hair and give it a healthy shine.</p><h3 class="text-xl font-bold text-amber-500 mb-2">5. Comb or Brush It In</h3><p class="mb-4">Finally, use your Beard Brothas' Comb or Brush to evenly distribute the oil, detangle any knots, and style your beard into place. This ensures every single hair gets the nourishment it needs.</p>` },
    { id: 2, title: "Beard Oil vs. Beard Balm: What's the Difference?", content: `<p class="mb-4">It's one of the most common questions we get: "Should I use beard oil or beard balm?" The simple answer is: they do different jobs, and you might need both.</p><h3 class="text-xl font-bold text-amber-500 mb-2">Beard Oil: The Foundation</h3><p class="mb-4"><strong>Think of beard oil as conditioner for your skin.</strong> Its primary job is to moisturize the skin underneath your beard. Why? Because your beard wicks away the natural oils from your skin, which can lead to dryness, itchiness, and flakes (beardruff). Our Beard Oil is a lightweight liquid designed to mimic those natural oils, keeping your skin healthy and creating the perfect foundation for growth.</p><p class="mb-4"><strong>Use it for:</strong> Daily skin hydration, eliminating itch, and giving your beard a healthy shine.</p><h3 class="text-xl font-bold text-amber-500 mb-2">Beard Balm: The Stylist</h3><p class="mb-4"><strong>Think of beard balm as a styling product for your beard hair.</strong> Our Beard Balm has a thicker consistency because it contains waxes (like beeswax) in addition to nourishing oils. This gives it a light-to-medium hold, perfect for taming flyaway hairs, shaping your beard, and giving it a fuller, more styled appearance.</p><p class="mb-4"><strong>Use it for:</strong> Taming unruly hairs, styling your beard into a specific shape, and adding a look of thickness.</p><h3 class="text-xl font-bold text-amber-500 mb-2">How to Use Them Together</h3><p class="mb-4">On most days, you'll want to apply beard oil first to take care of the skin. Then, scrape a small amount of beard balm, melt it in your hands, and apply it to the outside of your beard to style it for the day.</p>` },
    { id: 3, title: "A Guide to Your Tools: Brush vs. Comb vs. Pick", content: `<p class="mb-4">The right tool can make all the difference. Here’s a breakdown of the Beard Brothas' arsenal to help you choose the right one for your beard length and goals.</p><h3 class="text-xl font-bold text-amber-500 mb-2">The Boar Bristle Brush</h3><p class="mb-4"><strong>Best for:</strong> Short beards (and all beards as a first step).</br>The natural boar bristles are excellent for a few key jobs. First, they exfoliate the skin under your beard, helping to clear away dead skin cells. Second, they are fantastic at distributing your beard oil evenly from root to tip. For shorter beards, a brush is often all you need to keep things neat.</p><h3 class="text-xl font-bold text-amber-500 mb-2">The Peachwood Beard Comb</h3><p class="mb-4"><strong>Best for:</strong> Medium-length beards.</br>Once your beard has some length, you'll need a comb to handle detangling. Our wood comb is anti-static, meaning it won't cause frizz like a cheap plastic comb. It's perfect for working through knots after applying oil or balm and for general styling.</p><h3 class="text-xl font-bold text-amber-500 mb-2">The Wood Beard Pick</h3><p class="mb-4"><strong>Best for:</strong> Long, thick, or coily beards.</br>For the brothas with truly epic manes, a standard comb just won't cut it. The Beard Pick is designed to get deep into a thick beard to lift the hair from the root. This helps to create volume and shape, preventing your beard from looking flat and giving it a fuller, more powerful profile.</p>` },
    { id: 4, title: "The 3 Keys to Conquering Beard Itch", content: `<p class="mb-4">Almost every man who grows a beard experiences the dreaded itch, especially in the first few weeks. It's the number one reason men give up and shave. But you don't have to suffer. Here are the three keys to stopping the itch for good.</p><h3 class="text-xl font-bold text-amber-500 mb-2">1. Cleanse, Don't Strip</h3><p class="mb-4">Regular head-and-shoulders shampoo is too harsh for your face. It strips away all your natural oils, leaving the skin underneath your beard dry, tight, and incredibly itchy. You need a dedicated <strong>Beard Wash</strong>. It's formulated to be gentle enough for your face, cleansing away dirt and grime without causing irritation.</p><h3 class="text-xl font-bold text-amber-500 mb-2">2. Hydrate the Skin (This is the Big One)</h3><p class="mb-4">The primary cause of beard itch is dry skin. As your beard grows, it acts like a wick, pulling moisture away from your face. The solution is simple: you have to put that moisture back. Applying <strong>Beard Oil</strong> every single day, especially after washing, is non-negotiable. Massage it directly into the skin to keep it hydrated, supple, and itch-free.</p><h3 class="text-xl font-bold text-amber-500 mb-2">3. Exfoliate and Train Your Hairs</h3><p class="mb-4">Using a <strong>Boar Bristle Brush</strong> does two things. First, it gently exfoliates the skin, removing the dead skin cells that can contribute to irritation. Second, it helps to "train" your beard hairs to grow in a more uniform direction, which can reduce the prickly, itchy feeling as they grow out.</p>` }
];

const WEEKLY_TIPS = [
    { name: "Rest & Review", instruction: "No special product tasks this week. A great day to trim your neckline and check for stray hairs!" },
    { name: "Tool Cleaning Day", instruction: "Take a few minutes to clean your beard brush, comb, and pick to remove built-up oils and skin cells." },
    { name: "Hydration Check", instruction: "Healthy beards start from within. Are you drinking enough water? Make it a goal this week to stay well-hydrated." },
    { name: "Pillowcase Swap", instruction: "Swap out your pillowcase for a clean one. This helps prevent oils from your hair and face from building up and affecting your beard." }
];

const getProduct = (id) => ALL_PRODUCTS.find(p => p.id === id);

const QUIZ_STEPS = [
  { id: 'length', question: "What's your beard length?", options: [ { value: 'stubble', label: 'Stubble', icon: '🧔🏻' }, { value: 'short', label: 'Short', icon: '🧔🏼' }, { value: 'medium', label: 'Medium', icon: '🧔🏽' }, { value: 'long', label: 'Long', icon: '�🏾' } ] },
  { id: 'type', question: "What's your hair type?", options: [ { value: 'straight', label: 'Straight', icon: '📏' }, { value: 'wavy', label: 'Wavy', icon: '🌊' }, { value: 'curly', label: 'Curly', icon: '➰' }, { value: 'coily', label: 'Coily', icon: '➿' } ] },
  { id: 'skin', question: "How's your skin underneath?", options: [ { value: 'normal', label: 'Normal', icon: '🙂' }, { value: 'dry', label: 'Dry / Itchy', icon: '🌵' }, { value: 'oily', label: 'Oily', icon: '💧' } ] },
  { id: 'hairstyle', question: "What's your style up top?", options: [ { value: 'hair', label: 'Got a full mane', icon: '💇‍♂️' }, { value: 'bald', label: 'Rockin\' the bald look', icon: '🧑‍🦲' }, { value: 'buzzed', label: 'Keeping it buzzed', icon: '🪒' } ] },
  { id: 'goal', question: "What's your main goal?", options: [ { value: 'softness', label: 'Softer Beard', icon: '☁️' }, { value: 'growth', label: 'Fuller Growth', icon: '📈' }, { value: 'taming', label: 'Tame Frizz', icon: '🦁' }, { value: 'health', label: 'Overall Health', icon: '💪' } ] },
];

const generateRoutine = (answers, ownedProducts) => {
  const { length, type, skin, goal, hairstyle } = answers;
  let routine = { morning: [], evening: [], weekly: [], recommendations: [] };
  const addOrRecommend = (productId, instruction) => {
    const product = getProduct(productId);
    if (!product) return null; 
    if (ownedProducts.includes(productId)) return { type: 'task', product: product, instruction };
    else return { type: 'recommendation', product: product, instruction: `Consider adding this to your shelf to ${instruction}` };
  };
  const washInstruction = "Use a quarter-sized amount and lather well. For a richer lather (especially with sulfate-free washes), rinse lightly and repeat a second time.";
  const washTask = addOrRecommend('wash', washInstruction);
  if (washTask) { if (washTask.type === 'task') routine.morning.push(washTask); else routine.recommendations.push(washTask); }
  let oilAmount = "3-5 drops";
  if (length === 'medium') oilAmount = "5-8 drops";
  if (length === 'long') oilAmount = "8-12+ drops";
  const oilInstruction = `Apply ${oilAmount}. Warm in hands and massage into the skin and beard.`;
  const oilTask = addOrRecommend('oil', oilInstruction);
  if (oilTask) { if (oilTask.type === 'task') routine.morning.push(oilTask); else routine.recommendations.push(oilTask); }
  if (skin === 'dry') {
    const eveningOilInstruction = `Apply another 2-3 drops before bed to keep skin hydrated overnight.`;
    const eveningOilTask = addOrRecommend('oil', eveningOilInstruction);
    if (eveningOilTask) { if (eveningOilTask.type === 'task') routine.evening.push(eveningOilTask); else routine.recommendations.push(eveningOilTask); }
  }
  const balmInstruction = 'Scrape a pea-sized amount, melt between your palms, and apply to your beard to shape and tame flyaways.';
  if (goal === 'taming' || length === 'medium' || length === 'long') {
    const balmTask = addOrRecommend('balm', balmInstruction);
    if (balmTask) { if (balmTask.type === 'task') routine.morning.push(balmTask); else routine.recommendations.push(balmTask); }
  }
  let idealToolId;
  if (length === 'long') idealToolId = 'pick';
  else if (length === 'medium' || type === 'curly' || type === 'coily') idealToolId = 'comb';
  else idealToolId = 'brush';
  const toolTask = addOrRecommend(idealToolId, `use the ${getProduct(idealToolId).name.toLowerCase()} to style, detangle, and distribute products evenly.`);
  if(toolTask) { if(toolTask.type === 'task') routine.morning.push(toolTask); else routine.recommendations.push(toolTask); }
  if (hairstyle === 'bald' || hairstyle === 'buzzed') {
    const headBalmInstruction = "After your shower, apply a small, dime-sized amount to your scalp for a smooth, moisturized finish.";
    const headBalmTask = addOrRecommend('head_balm', headBalmInstruction);
    if (headBalmTask) {
        if (headBalmTask.type === 'task') { routine.morning.push(headBalmTask); } 
        else { routine.recommendations.push(headBalmTask); }
    }
  }
  if (routine.weekly.length === 0) {
    const randomTip = WEEKLY_TIPS[Math.floor(Math.random() * WEEKLY_TIPS.length)];
    routine.weekly.push({ type: 'task', product: {name: randomTip.name, description: ""}, instruction: randomTip.instruction });
  }
  return routine;
};

// --- Page & Sub-Components ---

const ProgressBar = ({ current, total }) => <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8"><div className="bg-amber-500 h-2.5 rounded-full transition-all" style={{ width: `${(current / total) * 100}%` }}></div></div>;
const QuizOption = ({ option, onSelect, isSelected }) => <button onClick={() => onSelect(option.value)} className={`w-full text-left p-4 md:p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${isSelected ? 'bg-amber-500 border-amber-400 shadow-lg' : 'bg-gray-800 border-gray-700 hover:border-amber-500'}`}><div className="flex items-center"><span className="text-3xl mr-4">{option.icon}</span><span className="text-lg font-semibold text-white">{option.label}</span></div></button>;
const QuizStep = ({ step, onSelect, selectedValue }) => <div className="w-full animate-fade-in"><h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">{step.question}</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{step.options.map((option) => <QuizOption key={option.value} option={option} onSelect={onSelect} isSelected={selectedValue === option.value} />)}</div></div>;

const MyShelfStep = ({ ownedProducts, setOwnedProducts, onContinue }) => {
    const shelfProducts = ALL_PRODUCTS.filter(p => p.type !== 'tool');
    const isNoneOwned = ownedProducts.length === 0;

    const handleToggleProduct = (productId) => {
        setOwnedProducts(prev => 
            prev.includes(productId) 
            ? prev.filter(id => id !== productId) 
            : [...prev, productId]
        );
    };

    const handleSelectNone = () => {
        setOwnedProducts([]);
    };

    return (
        <div className="w-full animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">My Shelf</h2>
            <p className="text-gray-400 mb-6 text-center">Which Beard Brothas products do you already own?</p>
            
            <button
                onClick={handleSelectNone}
                className={`w-full p-4 mb-4 rounded-lg border-2 text-center transition-colors ${
                    isNoneOwned ? 'bg-amber-500 border-amber-400' : 'bg-gray-800 border-gray-700 hover:border-amber-500'
                }`}
            >
                <p className="font-semibold text-white">I don't own any... yet!</p>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shelfProducts.map(product => (
                    <button
                        key={product.id}
                        onClick={() => handleToggleProduct(product.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            ownedProducts.includes(product.id) ? 'bg-amber-500 border-amber-400' : 'bg-gray-800 border-gray-700 hover:border-amber-500'
                        }`}
                    >
                        <p className="font-semibold text-white">{product.name}</p>
                    </button>
                ))}
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={onContinue}
                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg"
                >
                    Generate My Routine
                </button>
            </div>
        </div>
    );
};

const RoutineDisplay = ({ routine, onRestart }) => {
    const RoutineSection = ({ title, tasks, icon }) => {
      if (!tasks || tasks.length === 0) return null;
      return <div className="mb-6"><h3 className="text-2xl font-bold text-amber-500 border-b-2 border-gray-700 pb-2 mb-4 flex items-center"><span className="text-2xl mr-3">{icon}</span>{title}</h3><ul className="space-y-4">{tasks.map((task, index) => {
          const content = (<>
            <span className={`${task.type === 'task' ? 'text-green-400' : 'text-yellow-400'} text-2xl mr-4 mt-1`}>{task.type === 'task' ? '✓' : '⭐'}</span>
            <div><p className="font-bold text-white">{task.product.name}</p><p className="text-gray-400">{task.instruction}</p></div>
          </>);
          if (task.type === 'recommendation') {
            return <a key={index} href={task.product.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-800 rounded-lg flex items-start hover:bg-gray-700 transition-colors cursor-pointer">{content}</a>
          }
          return <li key={index} className="p-4 bg-gray-800 rounded-lg flex items-start">{content}</li>
        })}</ul></div>;
    };
    return <div className="w-full animate-fade-in p-4 md:p-6 bg-gray-900 rounded-xl"><h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Your Personal Beard Brothas Routine</h2><p className="text-gray-400 mb-8 text-center">Here is the personalized routine crafted just for you.</p><RoutineSection title="Morning Routine" tasks={routine.morning} icon="☀️" /><RoutineSection title="Evening Routine" tasks={routine.evening} icon="🌙" /><RoutineSection title="Weekly Tasks" tasks={routine.weekly} icon="🗓️" /><RoutineSection title="Pro Tips & Recommendations" tasks={routine.recommendations} icon="💡" /><div className="mt-8 text-center"><button onClick={onRestart} className="bg-amber-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-700 transition-all shadow-lg">Start Over</button></div></div>;
};

const RoutineBuilderPage = () => {
  const [appState, setAppState] = useState('quiz');
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const [ownedProducts, setOwnedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('beardBrothasOwnedProducts');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load owned products from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('beardBrothasOwnedProducts', JSON.stringify(ownedProducts));
    } catch (error) {
        console.error("Failed to save owned products to localStorage", error);
    }
  }, [ownedProducts]);


  const currentStepData = QUIZ_STEPS[quizStep];
  const handleSelectAnswer = (value) => {
    const newAnswers = { ...answers, [currentStepData.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (quizStep < QUIZ_STEPS.length - 1) setQuizStep(quizStep + 1);
      else setAppState('shelf');
    }, 300);
  };
  
  const handleRestart = () => { setAnswers({}); setQuizStep(0); setAppState('quiz'); };
  const generatedRoutine = useMemo(() => generateRoutine(answers, ownedProducts), [answers, ownedProducts]);
  
  const renderContent = () => {
    switch(appState) {
      case 'quiz': return <><ProgressBar current={quizStep + 1} total={QUIZ_STEPS.length} /><QuizStep step={currentStepData} onSelect={handleSelectAnswer} selectedValue={answers[currentStepData.id]} /></>;
      case 'shelf': return <MyShelfStep ownedProducts={ownedProducts} setOwnedProducts={setOwnedProducts} onContinue={() => setAppState('routine')} />;
      case 'routine': return <RoutineDisplay routine={generatedRoutine} onRestart={handleRestart} />;
      default: return null;
    }
  }
  return <div className="w-full max-w-2xl mx-auto">{renderContent()}</div>;
};

const ShopPage = () => {
    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Beard Brothas Shop</h1>
            <p className="text-center text-green-400 font-semibold mb-6">Free shipping on all orders!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ALL_PRODUCTS.map(product => (
                    <a href={product.url} target="_blank" rel="noopener noreferrer" key={product.id} className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-amber-500 transition-all transform hover:-translate-y-1">
                        <div>
                            <h2 className="text-xl font-bold text-amber-500">{product.name}</h2>
                            <p className="text-gray-400 mt-2 mb-4">{product.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-2xl font-bold text-white">${product.price}</p>
                            <div className="bg-amber-600 text-white font-semibold py-2 px-5 rounded-lg">
                                {product.type === 'tool' ? 'View Tool' : 'View Scents'}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

const LearnPage = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    if (selectedArticle) {
        return (
            <div className="w-full max-w-2xl mx-auto animate-fade-in text-left">
                <button onClick={() => setSelectedArticle(null)} className="flex items-center text-amber-500 font-semibold mb-4 hover:text-amber-400">
                    <ChevronLeftIcon />
                    Back to Articles
                </button>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedArticle.title}</h1>
                    <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Learn & Inspire</h1>
            <div className="space-y-4 text-left">
                {ARTICLES.map(article => (
                    <button 
                        key={article.id} 
                        onClick={() => setSelectedArticle(article)}
                        className="w-full bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-amber-500 transition-colors text-left"
                    >
                        <h2 className="text-xl font-bold text-amber-500">{article.title}</h2>
                    </button>
                ))}
            </div>
            <a 
                href="mailto:customerservice@beardbrothas.com?subject=Feedback%20on%20the%20Beard%20Routine%20App"
                className="mt-8 inline-flex items-center justify-center bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg"
            >
                <MailIcon />
                <span className="ml-3">Send Feedback</span>
            </a>
        </div>
    );
};

const GrowthTrackerPage = () => {
    const [photos, setPhotos] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isPlayingTimelapse, setIsPlayingTimelapse] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        try {
            const savedPhotos = localStorage.getItem('beardBrothasPhotos');
            if (savedPhotos) {
                setPhotos(JSON.parse(savedPhotos));
            }
        } catch (error) {
            console.error("Could not load photos from localStorage", error);
        }
    }, []);

    const savePhotos = (newPhotos) => {
        try {
            setPhotos(newPhotos);
            localStorage.setItem('beardBrothasPhotos', JSON.stringify(newPhotos));
        } catch (error) {
            console.error("Could not save photos to localStorage", error);
            alert("Could not save photo. Your browser's storage might be full.");
        }
    };

    const handleAddPhotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500;
                const MAX_HEIGHT = 500;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

                const newPhoto = {
                    id: Date.now(),
                    date: new Date().toLocaleDateString(),
                    imageData: dataUrl,
                };
                savePhotos([newPhoto, ...photos]);
                setShowConfirmation(true);
                setTimeout(() => setShowConfirmation(false), 4000);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleDeletePhoto = (id) => {
        const updatedPhotos = photos.filter(photo => photo.id !== id);
        savePhotos(updatedPhotos);
    };

    const TimelapsePlayer = ({ photos, onClose }) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
            }, 500);

            return () => clearInterval(interval);
        }, [photos.length]);

        const orderedPhotos = [...photos].reverse();

        return (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-amber-500">
                    <XIcon />
                </button>
                <div className="relative w-full max-w-lg aspect-square p-4">
                    <img src={orderedPhotos[currentIndex].imageData} alt="Timelapse" className="w-full h-full object-contain rounded-lg" />
                    <p className="text-center text-white text-lg font-semibold mt-2">{orderedPhotos[currentIndex].date}</p>
                </div>
                 <div className="w-full max-w-lg p-4">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
            {isPlayingTimelapse && <TimelapsePlayer photos={photos} onClose={() => setIsPlayingTimelapse(false)} />}
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Growth Tracker</h1>
            <p className="text-gray-400 text-center mb-6">Track your beard's progress. Add a photo once a week to see how far you've come!</p>
            
            {showConfirmation && (
                <div className="bg-green-500 text-white text-center p-3 rounded-lg mb-4 animate-fade-in-out font-semibold">
                    Photo added! Come back next week to track your progress.
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                capture="user"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="flex space-x-4">
                <button
                    onClick={handleAddPhotoClick}
                    className="flex-1 bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg flex items-center justify-center text-lg"
                >
                    <CameraIcon />
                    <span className="ml-3">+ Add Photo</span>
                </button>

                {photos.length >= 3 && (
                     <button
                        onClick={() => setIsPlayingTimelapse(true)}
                        className="flex-1 bg-amber-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-lg flex items-center justify-center text-lg"
                    >
                        <FilmIcon />
                        <span className="ml-3">Create Time-Lapse</span>
                    </button>
                )}
            </div>
            
            {photos.length < 3 && (
                <p className="text-center text-amber-500 text-sm mt-4 animate-fade-in">
                    Save {3 - photos.length} more photo{3 - photos.length > 1 ? 's' : ''} to unlock the time-lapse feature!
                </p>
            )}

            <div className="mt-8">
                {photos.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <p>No photos yet.</p>
                        <p>Add your first photo to start your journey!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photos.map(photo => (
                            <div key={photo.id} className="relative group">
                                <img src={photo.imageData} alt={`Beard progress on ${photo.date}`} className="w-full h-auto aspect-square object-cover rounded-lg" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded-b-lg">{photo.date}</div>
                                <button
                                    onClick={() => handleDeletePhoto(photo.id)}
                                    className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


const TabBar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'routine', label: 'Routine', icon: <CalendarIcon /> },
        { id: 'shop', label: 'Shop', icon: <ShoppingBagIcon /> },
        { id: 'tracker', label: 'Tracker', icon: <CameraIcon /> },
        { id: 'learn', label: 'Learn', icon: <BookOpenIcon /> },
    ];
    return (
        <div className="w-full max-w-md mx-auto fixed bottom-4 left-0 right-0">
             <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-full flex justify-around mx-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors rounded-full ${
                            activeTab === tab.id ? 'text-amber-500' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab.icon}
                        <span className="text-xs font-medium mt-1">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('routine');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'routine': return <RoutineBuilderPage setActiveTab={setActiveTab} />;
      case 'shop': return <ShopPage />;
      case 'learn': return <LearnPage />;
      case 'tracker': return <GrowthTrackerPage />;
      default: return <RoutineBuilderPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-4 pb-28 font-sans text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out { animation: fade-in-out 4s ease-in-out forwards; }
      `}</style>
      
      <div className="w-full flex-grow">
        {renderActivePage()}
      </div>
      
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
}
�
