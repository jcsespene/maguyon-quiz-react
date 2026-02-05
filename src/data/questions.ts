/**
 * MSYS 51: IT Infrastructure - Question Pool
 * Single pool of questions - 10 random questions selected each session
 * All question types: multiple-choice, true-false, fill-blank, fill-blank-inline, arrangement, statement-ab
 */

import type { Question, QuizConfig } from '@/types/quiz';

// Single pool of all questions
export const QUESTION_POOL: Question[] = [
  // ============================================
  // CORE COMPUTING FUNDAMENTALS
  // ============================================
  {
    type: "fill-blank",
    question: "The ___ is described as the brain of every computing platform.",
    correct: ["Processor", "processor", "CPU", "cpu"],
    explanation: "The Processor is the brain of every computing platform."
  },
  {
    type: "multiple-choice",
    question: "Which is NOT one of the three core parts of a computing device?",
    options: ["Processor", "Memory", "Storage", "Input-Output"],
    correct: 2,
    explanation: "Storage is NOT a core part. The three core parts are: Processor, Memory, Input-Output."
  },
  {
    type: "fill-blank-inline",
    template: "Memory is also known as {{blank:primary,secondary,tertiary}} memory or {{blank:main,auxiliary,cache}} memory.",
    wordBank: [],
    correct: ["primary", "main"],
    explanation: "Memory = primary memory = main memory."
  },
  {
    type: "true-false",
    question: "_Storage_ is one of the three core parts of a computing device.",
    correctWord: "Input-Output",
    explanation: "The three core parts are Processor, Memory, and Input-Output. NOT Storage."
  },
  {
    type: "arrangement",
    question: "Arrange the three core parts in the order presented in the lecture:",
    items: ["Processor", "Memory", "Input-Output"],
    correct: [0, 1, 2],
    explanation: "The lecture lists: Processor, Memory, Input-Output."
  },
  {
    type: "fill-blank",
    question: "In design considerations, faster performance equals higher ___.",
    correct: ["cost", "Cost"],
    explanation: "Faster performance = higher cost. There's a balancing act."
  },
  {
    type: "statement-ab",
    statements: [
      "Memory is one of the three core parts of a computing device.",
      "Cache is one of the three core parts of a computing device."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - Cache is NOT listed as a core part."
  },
  {
    type: "multiple-choice",
    question: "If cost is too high, what happens according to design considerations?",
    options: ["Performance increases", "No one will buy it", "Quality improves", "Speed doubles"],
    correct: 1,
    explanation: "If cost is too high, no one will buy it - hence the balancing act."
  },
  {
    type: "fill-blank",
    question: "GPU is given as an example of a ___.",
    correct: ["Processor", "processor"],
    explanation: "GPU is mentioned as an example of a Processor."
  },
  {
    type: "true-false",
    question: "_RAM_ is explicitly listed as one of the three core parts in the lecture.",
    correctWord: "Memory",
    explanation: "The lecture says 'Memory' not 'RAM'. Memory is the core part."
  },

  // ============================================
  // PERFORMANCE METRICS
  // ============================================
  {
    type: "fill-blank",
    question: "Response time is also known as execution time or ___.",
    correct: ["latency", "Latency"],
    explanation: "Response time = execution time = latency."
  },
  {
    type: "fill-blank",
    question: "Throughput is also known as ___.",
    correct: ["bandwidth", "Bandwidth"],
    explanation: "Throughput = bandwidth."
  },
  {
    type: "multiple-choice",
    question: "Which measures the 'amount of work done in a given time'?",
    options: ["Latency", "Response time", "Throughput", "Execution time"],
    correct: 2,
    explanation: "Throughput = amount of work (data processed) done in a given time."
  },
  {
    type: "fill-blank-inline",
    template: "Execution time is {{blank:inversely,directly,equally}} proportional to performance.",
    wordBank: [],
    correct: ["inversely"],
    explanation: "Execution time is INVERSELY proportional to performance."
  },
  {
    type: "true-false",
    question: "_Higher_ execution time means higher performance.",
    correctWord: "Lower",
    explanation: "LOWER execution time = HIGHER performance (inversely proportional)."
  },
  {
    type: "statement-ab",
    statements: [
      "Response time is also called latency.",
      "Throughput is also called latency."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - Throughput is called bandwidth, not latency."
  },
  {
    type: "fill-blank",
    question: "An example of throughput measurement is bits per ___.",
    correct: ["minute", "Minute", "second", "Second"],
    explanation: "Bits per minute is given as an example of throughput measurement."
  },
  {
    type: "multiple-choice",
    question: "If Machine X is '$n$ times faster' than Machine Y, and $n=1$, this means:",
    options: ["X is faster", "Y is faster", "Both performed equally", "Cannot determine"],
    correct: 2,
    explanation: "If $n=1$, two machines performed equal."
  },
  {
    type: "true-false",
    question: "Faster response time usually means _improvement_ in throughput.",
    correctWord: "improvement",
    explanation: "In general, faster response time means improvement in throughput."
  },
  {
    type: "fill-blank",
    question: "Decrease in execution time ___ performance.",
    correct: ["improves", "Improves", "increases", "Increases"],
    explanation: "Decrease in execution time IMPROVES performance."
  },

  // ============================================
  // AMDAHL'S LAW
  // ============================================
  {
    type: "fill-blank",
    question: "In Amdahl's Law, $f$ represents the ___ of time the faster mode is used.",
    correct: ["fraction", "Fraction"],
    explanation: "f = fraction of time the faster mode can be used."
  },
  {
    type: "fill-blank",
    question: "In Amdahl's Law, $N$ represents the ___ mode.",
    correct: ["faster", "Faster"],
    explanation: "N = faster mode (speedup factor)."
  },
  {
    type: "true-false",
    question: "Amdahl's Law result has a unit of measurement like _seconds_ or hertz.",
    correctWord: "no unit",
    explanation: "Amdahl's Law gives just a number without any unit."
  },
  {
    type: "fill-blank-inline",
    template: "The closer to {{blank:100,50,0}}% in using a component, the {{blank:greater,smaller,equal}} the upgrade benefit.",
    wordBank: [],
    correct: ["100", "greater"],
    explanation: "Closer to $100$% usage = greater upgrade benefit."
  },
  {
    type: "multiple-choice",
    question: "Which is NOT an application of Amdahl's Law?",
    options: ["Upgrade a component", "Compare multiple upgrades", "Parallel computing", "Calculate memory size"],
    correct: 3,
    explanation: "Amdahl's Law is used for: upgrading components, comparing upgrades, parallel computing."
  },
  {
    type: "fill-blank",
    question: "In parallel computing, improvement is limited by the ___ portion.",
    correct: ["sequential", "Sequential"],
    explanation: "Improvement limited by sequential portion (cannot be parallelized)."
  },
  {
    type: "statement-ab",
    statements: [
      "Amdahl's Law can be used for parallel computing.",
      "Amdahl's Law result is measured in seconds."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - Amdahl's Law has no unit."
  },
  {
    type: "arrangement",
    question: "Arrange Amdahl's Law applications as listed:",
    items: ["Upgrade a component", "Compare multiple upgrades", "Parallel computing"],
    correct: [0, 1, 2],
    explanation: "Listed as: 1. upgrade, 2. compare upgrades, 3. parallel computing."
  },
  {
    type: "fill-blank",
    question: "Speedup based on ___ workload in parallel computing.",
    correct: ["constant", "Constant"],
    explanation: "Speedup is based on constant workload."
  },
  {
    type: "multiple-choice",
    question: "If CPU is used $60$% of time and upgraded to $2$x speed, the speedup is approximately:",
    options: ["$1.00$", "$1.43$", "$2.00$", "$1.20$"],
    correct: 1,
    explanation: "Speedup $= \\frac{1}{(1-0.6)+\\frac{0.6}{2}} = \\frac{1}{0.4+0.3} = \\frac{1}{0.7} \\approx 1.43$"
  },

  // ============================================
  // MOORE'S LAW & TRANSISTORS
  // ============================================
  {
    type: "fill-blank",
    question: "A transistor controls the flow of electric ___ from input to output.",
    correct: ["current", "Current"],
    explanation: "Transistor controls flow of electric current."
  },
  {
    type: "fill-blank-inline",
    template: "A transistor acts as a {{blank:binary,analog,digital}} switch where {{blank:0,1}} = absence and {{blank:1,0}} = presence of current.",
    wordBank: [],
    correct: ["binary", "0", "1"],
    explanation: "Binary switch: $0$ = no current, $1$ = current present."
  },
  {
    type: "fill-blank",
    question: "According to Moore's Law, transistors double every ___ to $24$ months.",
    correct: ["18", "eighteen"],
    explanation: "Transistor count doubles every $18$-$24$ months."
  },
  {
    type: "true-false",
    question: "Modern CPU chips contain _millions_ of transistors.",
    correctWord: "billions",
    explanation: "Modern CPUs contain BILLIONS of transistors."
  },
  {
    type: "fill-blank",
    question: "Moore's Law is described as an important ___ in computing technology.",
    correct: ["driver", "Driver"],
    explanation: "Moore's Law is an important driver in computing technology."
  },
  {
    type: "multiple-choice",
    question: "Transistors in a CPU chip are:",
    options: ["Visible to naked eye", "Invisible to naked eye", "Measured in centimeters", "Always circular"],
    correct: 1,
    explanation: "Billion transistors are invisible to the naked eye."
  },
  {
    type: "statement-ab",
    statements: [
      "A transistor acts as a binary switch.",
      "In a transistor, $1$ represents absence of electric current."
    ],
    correct: [1],
    explanation: "Statement $1$ is TRUE. Statement $2$ is FALSE - $0$ = absence, $1$ = presence of current."
  },
  {
    type: "fill-blank",
    question: "Transistors scale vertically and become ___.",
    correct: ["thicker", "Thicker"],
    explanation: "Scale vertically = becomes thicker."
  },
  {
    type: "true-false",
    question: "The lecture _questions_ whether Moore's Law is still valid.",
    correctWord: "questions",
    explanation: "The lecture asks 'Is it still valid?'"
  },
  {
    type: "fill-blank",
    question: "Modern CPU chips contain ___ of transistors.",
    correct: ["billions", "Billions"],
    explanation: "Billions of transistors in modern CPUs."
  },

  // ============================================
  // MANUFACTURING & IC COSTS
  // ============================================
  {
    type: "fill-blank",
    question: "The learning curve states that manufacturing costs ___ over time.",
    correct: ["decrease", "Decrease"],
    explanation: "Manufacturing costs decrease over time."
  },
  {
    type: "fill-blank",
    question: "___ is the percentage of products that survives quality control.",
    correct: ["Yield", "yield"],
    explanation: "Yield = percentage surviving quality control."
  },
  {
    type: "fill-blank-inline",
    template: "The {{blank:die,wafer,chip}} is fragile and enclosed. The {{blank:wafer,die,case}} is silicon-based.",
    wordBank: [],
    correct: ["die", "wafer"],
    explanation: "Die = fragile, enclosed. Wafer = silicon-based."
  },
  {
    type: "fill-blank",
    question: "If dust particles land on a wafer, it ___ that part.",
    correct: ["damages", "Damages"],
    explanation: "Dust particles damage the wafer."
  },
  {
    type: "arrangement",
    question: "Arrange the major IC production cost contributors:",
    items: ["Die cost", "Packaging", "Testing", "Yield"],
    correct: [0, 1, 2, 3],
    explanation: "Listed as: Die cost, Packaging, Testing, Yield."
  },
  {
    type: "fill-blank",
    question: "Die ___ refers to usable dies not exposed to dust particles.",
    correct: ["yield", "Yield"],
    explanation: "Die yield = usable dies not damaged by dust."
  },
  {
    type: "true-false",
    question: "Lower manufacturing costs _always_ mean lower product prices.",
    correctWord: "sometimes",
    explanation: "Lower costs may just mean increased profits, not always lower prices."
  },
  {
    type: "multiple-choice",
    question: "What is the protective shell around a die called?",
    options: ["Wafer", "Packaging", "Yield", "Testing"],
    correct: 1,
    explanation: "Packaging is the protective shell."
  },
  {
    type: "fill-blank",
    question: "Final test yield checks how die connects with the ___.",
    correct: ["enclosure", "Enclosure"],
    explanation: "Final test yield checks die-enclosure connection."
  },
  {
    type: "statement-ab",
    statements: [
      "The die is fragile and enclosed.",
      "The die is silicon-based and encloses the wafer."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - the WAFER encloses the die, not vice versa."
  },

  // ============================================
  // COST VS PRICE & COMPONENTS
  // ============================================
  {
    type: "fill-blank",
    question: "Direct costs add approximately +___% to component costs.",
    correct: ["33", "33%"],
    explanation: "Direct costs add +$33$%."
  },
  {
    type: "fill-blank",
    question: "Gross margin ranges from +$25$% to +___% covering overhead.",
    correct: ["100", "100%"],
    explanation: "Gross margin = +$25$-$100$%."
  },
  {
    type: "fill-blank-inline",
    template: "Apple {{blank:designs,manufactures,tests}} chips but {{blank:outsources,designs,tests}} manufacturing.",
    wordBank: [],
    correct: ["designs", "outsources"],
    explanation: "Apple designs but outsources manufacturing."
  },
  {
    type: "fill-blank",
    question: "Intel both designs and ___ their own chips.",
    correct: ["manufactures", "Manufactures"],
    explanation: "Intel designs AND manufactures."
  },
  {
    type: "fill-blank",
    question: "TSMC stands for Taiwan ___ Manufacturing Company.",
    correct: ["Semiconductor", "semiconductor"],
    explanation: "Taiwan Semiconductor Manufacturing Company."
  },
  {
    type: "multiple-choice",
    question: "Direct costs include all EXCEPT:",
    options: ["Labor", "Scrap", "Returns", "R&D"],
    correct: 3,
    explanation: "R&D is part of gross margin/overhead, not direct costs."
  },
  {
    type: "statement-ab",
    statements: [
      "Apple designs and outsources manufacturing.",
      "Apple designs and manufactures their own chips."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - Apple outsources manufacturing."
  },
  {
    type: "fill-blank",
    question: "Average discount ranges from +$50$% to +___% leading to list price.",
    correct: ["80", "80%"],
    explanation: "Average discount = +$50$-$80$%."
  },
  {
    type: "true-false",
    question: "_TSMC_ is described as the biggest hardware manufacturer.",
    correctWord: "TSMC",
    explanation: "TSMC is the biggest hardware manufacturer."
  },
  {
    type: "arrangement",
    question: "Arrange cost buildup from component to list price:",
    items: ["Component costs", "Direct costs (+$33$%)", "Gross margin (+$25$-$100$%)", "Average discount (+$50$-$80$%)"],
    correct: [0, 1, 2, 3],
    explanation: "Component → Direct → Gross margin → Average discount → List price."
  },

  // ============================================
  // OPERATING SYSTEMS BASICS
  // ============================================
  {
    type: "fill-blank",
    question: "The ___ is the core of the operating system.",
    correct: ["kernel", "Kernel"],
    explanation: "Kernel = core of OS."
  },
  {
    type: "fill-blank",
    question: "The kernel directly interfaces with the ___.",
    correct: ["hardware", "Hardware"],
    explanation: "Kernel directly interfaces with hardware."
  },
  {
    type: "fill-blank-inline",
    template: "OS shares resources '{{blank:in time,in space}}' (mutually exclusive) and '{{blank:in space,in time}}' (finite capability, many share).",
    wordBank: [],
    correct: ["in time", "in space"],
    explanation: "In time = mutually exclusive. In space = finite, shared."
  },
  {
    type: "fill-blank",
    question: "The kernel has ___ control of the hardware (absolute power).",
    correct: ["complete", "Complete", "full", "Full"],
    explanation: "Kernel has complete/full control."
  },
  {
    type: "multiple-choice",
    question: "A printer being used by one class at a time is sharing resources:",
    options: ["In space", "In time", "In parallel", "Sequentially"],
    correct: 1,
    explanation: "Printer = mutually exclusive = sharing in time."
  },
  {
    type: "true-false",
    question: "Storage space is an example of sharing resources '_in time_'.",
    correctWord: "in space",
    explanation: "Storage/memory = sharing 'in space' (finite but shared)."
  },
  {
    type: "statement-ab",
    statements: [
      "The kernel has absolute power over hardware.",
      "Applications directly interface with hardware."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - the kernel interfaces with hardware."
  },
  {
    type: "fill-blank",
    question: "The kernel layer determines the ___ of all layers above it.",
    correct: ["performance", "Performance"],
    explanation: "Kernel determines performance of all layers upward."
  },
  {
    type: "multiple-choice",
    question: "Which is an example of sharing resources 'in space'?",
    options: ["Printer", "CPU time", "Memory/storage", "Single pen"],
    correct: 2,
    explanation: "Memory/storage = finite capability, many can share = in space."
  },
  {
    type: "fill-blank",
    question: "Mutually exclusive means only ___ entity can use at a given time.",
    correct: ["1", "one", "One"],
    explanation: "Mutually exclusive = only $1$ entity at a time."
  },

  // ============================================
  // DUAL-MODE & OS TYPES
  // ============================================
  {
    type: "fill-blank",
    question: "___ mode is limited and prevents entities from harming hardware.",
    correct: ["User", "user"],
    explanation: "User mode is limited."
  },
  {
    type: "fill-blank",
    question: "___ mode executes privileged instructions.",
    correct: ["Kernel", "kernel"],
    explanation: "Kernel mode executes privileged instructions."
  },
  {
    type: "fill-blank",
    question: "Kernel mode is the default at ___ time.",
    correct: ["boot", "Boot"],
    explanation: "Kernel mode is default at boot time."
  },
  {
    type: "fill-blank-inline",
    template: "{{blank:Mainframe,Server,Desktop}} OS is used in banks. {{blank:Server,Mainframe,Desktop}} OS is used in data centers.",
    wordBank: [],
    correct: ["Mainframe", "Server"],
    explanation: "Mainframe = banks. Server = data centers."
  },
  {
    type: "fill-blank",
    question: "___ systems have limited OS installed in appliances like microwaves.",
    correct: ["Embedded", "embedded"],
    explanation: "Embedded systems in appliances."
  },
  {
    type: "true-false",
    question: "MS Word _alternates_ between user mode and kernel mode.",
    correctWord: "alternates",
    explanation: "Applications alternate between user and kernel modes."
  },
  {
    type: "multiple-choice",
    question: "Dual-mode operation (user/kernel) is different from:",
    options: ["Boot vs runtime", "Guest vs admin account", "Online vs offline", "32-bit vs 64-bit"],
    correct: 1,
    explanation: "Dual-mode is different from guest/admin accounts."
  },
  {
    type: "statement-ab",
    statements: [
      "Hard real-time OS must strictly meet response time or it fails.",
      "Soft real-time OS must strictly meet response time or it fails."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - Soft RTOS is flexible."
  },
  {
    type: "fill-blank",
    question: "An airbag system is an example of ___ real-time OS.",
    correct: ["hard", "Hard"],
    explanation: "Airbag = hard RTOS (strict timing)."
  },
  {
    type: "fill-blank",
    question: "A Bluetooth speaker is an example of ___ real-time OS.",
    correct: ["soft", "Soft"],
    explanation: "Bluetooth speaker = soft RTOS (flexible timing)."
  },

  // ============================================
  // OS COMPONENTS & PROCESS MANAGEMENT
  // ============================================
  {
    type: "fill-blank",
    question: "A ___ is a program in execution (currently running).",
    correct: ["process", "Process"],
    explanation: "Process = program in execution."
  },
  {
    type: "fill-blank",
    question: "___ enable parallel processing as parts of a process.",
    correct: ["Threads", "threads"],
    explanation: "Threads enable parallel processing."
  },
  {
    type: "arrangement",
    question: "Arrange from SLOWEST to FASTEST:",
    items: ["I/O", "Main Memory", "CPU"],
    correct: [0, 1, 2],
    explanation: "Slowest to fastest: I/O → MM → CPU."
  },
  {
    type: "fill-blank",
    question: "Main memory is ___ - data is lost when power is removed.",
    correct: ["volatile", "Volatile"],
    explanation: "Main memory is volatile."
  },
  {
    type: "fill-blank-inline",
    template: "A device {{blank:controller,driver}} is hardware. A device {{blank:driver,controller}} is OS-dependent software.",
    wordBank: [],
    correct: ["controller", "driver"],
    explanation: "Controller = hardware. Driver = software."
  },
  {
    type: "true-false",
    question: "The _same_ driver works on both Mac OS and Windows.",
    correctWord: "different",
    explanation: "Drivers are platform/OS-specific, so different drivers are needed."
  },
  {
    type: "fill-blank",
    question: "NTFS and FAT32 are examples of ___ systems.",
    correct: ["file", "File"],
    explanation: "NTFS, FAT32 = file systems."
  },
  {
    type: "multiple-choice",
    question: "Programs load to main memory during boot because MM is ___ than I/O.",
    options: ["Slower", "Faster", "Cheaper", "Larger"],
    correct: 1,
    explanation: "MM is faster than I/O devices."
  },
  {
    type: "statement-ab",
    statements: [
      "Main memory has limited capacity.",
      "Main memory is persistent (data remains after power off)."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - MM is volatile."
  },
  {
    type: "fill-blank",
    question: "Malware can disguise itself as a program executing in the ___.",
    correct: ["background", "Background"],
    explanation: "Malware can disguise as background processes."
  },

  // ============================================
  // SMART CARDS & COMPREHENSIVE
  // ============================================
  {
    type: "fill-blank",
    question: "Smart cards have a processor but no ___ source.",
    correct: ["power", "Power"],
    explanation: "Smart cards lack their own power."
  },
  {
    type: "fill-blank",
    question: "NFC stands for Near-field ___.",
    correct: ["Communicator", "communicator"],
    explanation: "NFC = Near-field Communicator."
  },
  {
    type: "fill-blank",
    question: "The card ___ provides power to a smart card's CPU.",
    correct: ["reader", "Reader"],
    explanation: "Card reader provides power."
  },
  {
    type: "fill-blank-inline",
    template: "Execution time is {{blank:inversely,directly}} proportional to performance. Throughput is also called {{blank:bandwidth,latency}}.",
    wordBank: [],
    correct: ["inversely", "bandwidth"],
    explanation: "Inversely proportional. Throughput = bandwidth."
  },
  {
    type: "true-false",
    question: "You _can_ install apps on embedded systems like microwaves.",
    correctWord: "cannot",
    explanation: "Cannot install apps on embedded systems (except smart TVs)."
  },
  {
    type: "arrangement",
    question: "Arrange the relationship chain for I/O:",
    items: ["Device", "Controller", "Driver"],
    correct: [0, 1, 2],
    explanation: "Device ↔ Controller (hardware) ↔ Driver (software)."
  },
  {
    type: "statement-ab",
    statements: [
      "The processor is the brain of computing platforms.",
      "Memory is also called secondary storage."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE - Memory = PRIMARY memory."
  },
  {
    type: "multiple-choice",
    question: "Which company designs AND manufactures their own chips?",
    options: ["Apple", "Intel", "TSMC", "Microsoft"],
    correct: 1,
    explanation: "Intel designs and manufactures. Apple only designs."
  },
  {
    type: "fill-blank",
    question: "Protection systems are crucial in multitasking and ___ systems.",
    correct: ["multiuser", "Multiuser"],
    explanation: "Crucial for multitasking and multiuser systems."
  },
  {
    type: "fill-blank",
    question: "Moore's Law: transistors double every ___-$24$ months.",
    correct: ["18"],
    explanation: "Transistors double every $18$-$24$ months."
  },

  // ============================================
  // ADVANCED/TRICKY QUESTIONS
  // ============================================
  {
    type: "multiple-choice",
    question: "Response time is also known as which TWO of the following terms?",
    options: [
      "Execution time and Bandwidth",
      "Latency and Throughput",
      "Execution time and Latency",
      "Bandwidth and Processing time"
    ],
    correct: 2,
    explanation: "Response time is synonymous with execution time and latency - all refer to the time spent to complete an event."
  },
  {
    type: "true-false",
    question: "Throughput and bandwidth refer to _different_ concepts in computing performance.",
    correctWord: "the same",
    explanation: "Throughput is also known as bandwidth - both refer to the amount of work (data processed) done in a given time."
  },
  {
    type: "multiple-choice",
    question: "If $\\frac{\\text{Performance}(X)}{\\text{Performance}(Y)} = n$, and $n = 1$, what does this indicate?",
    options: [
      "Machine X is faster than Machine Y",
      "Machine Y is faster than Machine X",
      "Both machines performed equally",
      "The calculation is invalid"
    ],
    correct: 2,
    explanation: "When $n = 1$, the ratio indicates equal performance between the two machines."
  },
  {
    type: "multiple-choice",
    question: "A laptop uses its CPU $60$% of the time. If the CPU is upgraded to be $2$x faster, what is the overall speedup according to Amdahl's Law?",
    options: [
      "$1.20$x faster",
      "$1.42$x faster",
      "$1.60$x faster",
      "$2.00$x faster"
    ],
    correct: 1,
    explanation: "Using Amdahl's Law with $f=0.6$ and $N=2$: Speedup $= \\frac{1}{(1-0.6) + \\frac{0.6}{2}} = \\frac{1}{0.7} \\approx 1.42\\times$",
    needsCalculator: true,
  },
  {
    type: "multiple-choice",
    question: "Which of the following is NOT a valid application of Amdahl's Law?",
    options: [
      "Upgrading a single component",
      "Comparing multiple upgrade options when only one can be chosen",
      "Calculating exact execution time in seconds",
      "Analyzing parallel computing benefits"
    ],
    correct: 2,
    explanation: "Amdahl's Law calculates speedup ratios, not exact execution times. Its applications include component upgrades, comparing upgrade options, and parallel computing analysis."
  },
  {
    type: "multiple-choice",
    question: "An AI server is used $70$% of the time. Adding another AI server ($2$x parallel capacity) gives a speedup of approximately:",
    options: [
      "$1.18$x",
      "$1.54$x",
      "$2.00$x",
      "$1.70$x"
    ],
    correct: 1,
    explanation: "Speedup $= \\frac{1}{(1-0.7) + \\frac{0.7}{2}} = \\frac{1}{0.65} \\approx 1.54\\times$",
    needsCalculator: true,
  },
  {
    type: "statement-ab",
    statements: [
      "Amdahl's Law result has no units - it's just a ratio.",
      "Amdahl's Law can predict unlimited speedup with infinite N."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE - Amdahl's Law gives a unitless ratio. Statement 2 is FALSE - speedup is limited by (1-f), the sequential portion."
  },
  {
    type: "multiple-choice",
    question: "If $f = 0.5$ and $N = 4$, what is the Amdahl's Law speedup?",
    options: ["$1.6$x", "$2.0$x", "$2.5$x", "$4.0$x"],
    correct: 0,
    explanation: "Speedup $= \\frac{1}{(1-0.5) + \\frac{0.5}{4}} = \\frac{1}{0.625} = 1.6\\times$",
    needsCalculator: true,
  },
  {
    type: "true-false",
    question: "In binary representation within transistors, '$0$' represents the _presence_ of electric current.",
    correctWord: "absence",
    explanation: "$0$ represents the ABSENCE of electric current, while $1$ represents the PRESENCE of electric current."
  },
  {
    type: "multiple-choice",
    question: "The 'learning curve' in manufacturing refers to:",
    options: [
      "Time required to train new employees",
      "Manufacturing costs decreasing over time",
      "Complexity of new technology adoption",
      "Consumer education requirements"
    ],
    correct: 1,
    explanation: "The learning curve refers to how manufacturing costs decrease over time as processes improve and become more efficient."
  },
  {
    type: "multiple-choice",
    question: "In IC manufacturing, what is the relationship between the 'die' and the 'wafer'?",
    options: [
      "The die encloses the wafer",
      "The wafer encloses the die; the wafer is silicon-based",
      "They are the same component with different names",
      "The die is the manufacturing facility"
    ],
    correct: 1,
    explanation: "The die is fragile and is enclosed by the wafer, which is silicon-based. Dies per wafer excludes the perimeter parts."
  },
  {
    type: "statement-ab",
    statements: [
      "Die yield refers to usable dies not exposed to dust particles.",
      "Dies per wafer includes all dies including those on the perimeter."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE - Die yield = usable dies. Statement 2 is FALSE - Dies per wafer EXCLUDES perimeter parts, only fully formed dies."
  },
  {
    type: "multiple-choice",
    question: "Modern CPUs contain approximately how many transistors?",
    options: [
      "Millions (visible to naked eye)",
      "Billions (invisible to naked eye)",
      "Thousands (visible to naked eye)",
      "Hundreds (visible to naked eye)"
    ],
    correct: 1,
    explanation: "Modern CPUs contain BILLIONS of transistors that are invisible to the naked eye due to their microscopic size."
  },
  {
    type: "arrangement",
    question: "Arrange the following cost components in order from base to final list price:",
    items: ["Component costs", "Direct costs (+$33$%)", "Gross margin (+$25$-$100$%)", "Average discount (+$50$-$80$%)"],
    correct: [0, 1, 2, 3],
    explanation: "The sequence is: Component costs (inputs) → Direct costs (+$33$%) → Gross margin (+$25$-$100$% = avg selling price) → Average discount (+$50$-$80$% = list price)"
  },
  {
    type: "multiple-choice",
    question: "Gross margin includes all of the following EXCEPT:",
    options: [
      "R&D expenses",
      "Marketing costs",
      "Labor for manufacturing",
      "Profit"
    ],
    correct: 2,
    explanation: "Gross margin includes overhead (R&D, rent, marketing, profit). Labor for manufacturing is part of Direct costs, not Gross margin."
  },
  {
    type: "multiple-choice",
    question: "What does TSMC stand for and what is its significance?",
    options: [
      "Taiwan System Manufacturing Corp - largest software company",
      "Taiwan Semiconductor Manufacturing Company - biggest hardware manufacturer",
      "Technical Standards for Microchip Computing - industry standard body",
      "Transistor Scale Measurement Corporation - testing laboratory"
    ],
    correct: 1,
    explanation: "TSMC (Taiwan Semiconductor Manufacturing Company) is the world's biggest hardware manufacturer."
  },
  {
    type: "statement-ab",
    statements: [
      "Apple designs and manufactures its own chips.",
      "Intel designs and manufactures its own chips."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE - Apple designs but OUTSOURCES manufacturing. Statement 2 is TRUE - Intel designs AND manufactures."
  },
  {
    type: "multiple-choice",
    question: "Which company follows the 'design and outsource' production model?",
    options: ["Intel", "TSMC", "Apple", "AMD and Intel"],
    correct: 2,
    explanation: "Apple designs but outsources manufacturing. Intel designs and manufactures. TSMC manufactures for others."
  },
  {
    type: "multiple-choice",
    question: "The OS as a resource manager performs all of the following EXCEPT:",
    options: [
      "Allows multiple programs to run simultaneously",
      "Manages and protects memory and I/O devices",
      "Directly executes user applications",
      "Shares resources in time and space"
    ],
    correct: 2,
    explanation: "The OS manages resources and provides services - it doesn't directly execute user applications (that's the application layer)."
  },
  {
    type: "multiple-choice",
    question: "Which mode is the DEFAULT at boot time?",
    options: [
      "User mode",
      "Kernel mode",
      "Safe mode",
      "Administrator mode"
    ],
    correct: 1,
    explanation: "Kernel mode is the default at boot time. It executes privileged instructions and has full hardware access."
  },
  {
    type: "true-false",
    question: "User mode and Guest account access are the _same_ concept in operating systems.",
    correctWord: "different",
    explanation: "User mode (vs Kernel mode) is different from guest/admin accounts. Dual-mode operation is about hardware access privileges, not user account types."
  },
  {
    type: "multiple-choice",
    question: "When running MS Word, the system:",
    options: [
      "Stays permanently in user mode",
      "Stays permanently in kernel mode",
      "Alternates between user and kernel mode",
      "Creates a third hybrid mode"
    ],
    correct: 2,
    explanation: "Applications like MS Word alternate between user mode (for regular operations) and kernel mode (for hardware access)."
  },
  {
    type: "multiple-choice",
    question: "Machine X completes a task in $4$ seconds, Machine Y in $16$ seconds. How many times faster is Machine X?",
    options: [
      "$4$ times faster",
      "$12$ times faster",
      "$0.25$ times faster",
      "$20$ times faster"
    ],
    correct: 0,
    explanation: "Performance ratio $= \\frac{t(Y)}{t(X)} = \\frac{16}{4} = 4$. Machine X is $4\\times$ faster than Machine Y."
  },
  {
    type: "multiple-choice",
    question: "A component is used $80$% of the time. If you upgrade it to be $4$x faster, the Amdahl's Law speedup is approximately:",
    options: [
      "$3.2$x",
      "$2.5$x",
      "$4.0$x",
      "$1.8$x"
    ],
    correct: 1,
    explanation: "Speedup $= \\frac{1}{(1-0.8) + \\frac{0.8}{4}} = \\frac{1}{0.4} = 2.5\\times$",
    needsCalculator: true,
  },
  {
    type: "multiple-choice",
    question: "If $f = 0.9$ ($90$%), what is the MAXIMUM possible speedup regardless of $N$?",
    options: [
      "$9$x",
      "$10$x",
      "$90$x",
      "Unlimited"
    ],
    correct: 1,
    explanation: "Max speedup $= \\frac{1}{1-f} = \\frac{1}{1-0.9} = \\frac{1}{0.1} = 10\\times$. Even with infinite $N$, speedup cannot exceed $10\\times$.",
    needsCalculator: true,
  },
  {
    type: "statement-ab",
    statements: [
      "Execution time and performance are inversely proportional.",
      "Higher execution time means higher performance."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE - They are inversely proportional. Statement 2 is FALSE - Higher execution time means LOWER performance."
  },
  {
    type: "multiple-choice",
    question: "Using Amdahl's Law: $f=0.75$, $N=4$. What is the speedup?",
    options: [
      "$1.78$x",
      "$2.29$x",
      "$3.00$x",
      "$4.00$x"
    ],
    correct: 1,
    explanation: "Speedup $= \\frac{1}{(1-0.75) + \\frac{0.75}{4}} = \\frac{1}{0.4375} \\approx 2.29\\times$"
  },
  {
    type: "multiple-choice",
    question: "Die yield specifically refers to:",
    options: [
      "The total number of dies that can fit on a wafer",
      "The number of usable dies not exposed to dust particles",
      "The profit margin on each die",
      "The time required to produce one die"
    ],
    correct: 1,
    explanation: "Die yield refers to the usable dies that weren't damaged by dust particles during manufacturing."
  },
  {
    type: "true-false",
    question: "Dies per wafer calculation _includes_ all dies on the wafer, including those on the perimeter.",
    correctWord: "excludes",
    explanation: "Dies per wafer excludes the perimeter parts - only fully formed dies in the center are counted."
  },
  {
    type: "multiple-choice",
    question: "When transistors 'scale vertically,' they become:",
    options: [
      "Smaller in size",
      "Thicker",
      "More power efficient",
      "Less heat-generating"
    ],
    correct: 1,
    explanation: "Vertical scaling of transistors means they become thicker, allowing for more transistors in a given chip area."
  },
  {
    type: "multiple-choice",
    question: "The gross margin range in the pricing structure is typically:",
    options: [
      "+$10$-$20$%",
      "+$33$%",
      "+$25$-$100$%",
      "+$50$-$80$%"
    ],
    correct: 2,
    explanation: "Gross margin (covering R&D, rent, marketing, profit) adds $25$-$100$% to reach the average selling price."
  },
  {
    type: "statement-ab",
    statements: [
      "Dies per wafer excludes perimeter dies.",
      "Die yield includes dies damaged by dust."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE - Perimeter excluded. Statement 2 is FALSE - Die yield is USABLE dies, excluding damaged ones."
  },
  {
    type: "multiple-choice",
    question: "Which cost component adds $33$% in the pricing structure?",
    options: [
      "Component costs",
      "Direct costs",
      "Gross margin",
      "Average discount"
    ],
    correct: 1,
    explanation: "Direct costs (labor, scrap, returns) add approximately $33$% to component costs."
  },
  {
    type: "multiple-choice",
    question: "Which statement about the relationship between kernel performance and overall system performance is TRUE?",
    options: [
      "Kernel performance only affects system boot time",
      "Kernel performance determines the performance ceiling of all layers above it",
      "Kernel and application performance are independent",
      "Kernel performance only matters for server systems"
    ],
    correct: 1,
    explanation: "The kernel layer's performance determines the performance of all layers above it in the OS and computing platform."
  },
  {
    type: "multiple-choice",
    question: "Which components make hardware 'powerful and complex' requiring OS management?",
    options: [
      "Just the CPU",
      "CPU and Memory only",
      "Processors, main memory, storage, and I/O devices",
      "Only peripheral devices"
    ],
    correct: 2,
    explanation: "The four components are: processors (one or more), main memory, storage devices, and other I/O devices."
  },
  {
    type: "multiple-choice",
    question: "What happens when an application needs hardware access while in user mode?",
    options: [
      "It accesses hardware directly",
      "It crashes immediately",
      "It must request kernel mode through a system call",
      "The OS denies all hardware access permanently"
    ],
    correct: 2,
    explanation: "User mode applications must request kernel mode (via system calls) to access hardware. They cannot access directly."
  },
  {
    type: "statement-ab",
    statements: [
      "Kernel mode executes privileged instructions.",
      "User mode executes privileged instructions."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE - Kernel mode executes privileged instructions. Statement 2 is FALSE - User mode cannot execute privileged instructions."
  },
  {
    type: "multiple-choice",
    question: "Which of the following pairs are BOTH aliases for 'Response time'?",
    options: [
      "Throughput and Bandwidth",
      "Execution time and Latency",
      "Performance and Frequency",
      "Cycle time and Clock rate"
    ],
    correct: 1,
    explanation: "Response time = Execution time = Latency. Throughput = Bandwidth is a different concept measuring data processed per time."
  },
  {
    type: "arrangement",
    question: "Arrange these from innermost/lowest level to outermost/highest level in a computing system:",
    items: ["Hardware", "Kernel", "OS Services", "Applications"],
    correct: [0, 1, 2, 3],
    explanation: "From lowest to highest: Hardware → Kernel (core OS) → OS services → Applications (user-facing)."
  },
  {
    type: "true-false",
    question: "According to Moore's Law, if a chip has $1$ billion transistors today, it will have approximately _$4$ billion_ transistors in $3$-$4$ years.",
    correctWord: "$4$ billion",
    explanation: "Moore's Law: transistors double every $18$-$24$ months. In $3$-$4$ years ($36$-$48$ months), that's $2$ doublings: $1$B → $2$B → $4$B."
  },
  {
    type: "statement-ab",
    statements: [
      "A printer uses 'in time' resource sharing (mutually exclusive).",
      "Memory uses 'in time' resource sharing (mutually exclusive)."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE - Printer = in time (one job at a time). Statement 2 is FALSE - Memory = in space (shared capacity)."
  },
  {
    type: "multiple-choice",
    question: "Which company follows the model: designs chips but outsources manufacturing?",
    options: [
      "Intel",
      "TSMC",
      "Apple",
      "All of the above"
    ],
    correct: 2,
    explanation: "Apple designs but outsources manufacturing. Intel designs AND manufactures. TSMC only manufactures for others."
  },
  {
    type: "multiple-choice",
    question: "Using Amdahl's Law with $f=0.5$ and $N=\\infty$, the maximum speedup is:",
    options: [
      "1x",
      "2x",
      "Infinity",
      "0.5x"
    ],
    correct: 1,
    explanation: "Max speedup $= \\frac{1}{1-f} = \\frac{1}{1-0.5} = \\frac{1}{0.5} = 2\\times$. Even infinite $N$ cannot exceed this."
  },
];

// Bonus questions - fun/random questions unrelated to the course topic
// The 9th question is always a bonus from this pool
export const BONUS_QUESTIONS: Question[] = [
  {
    type: "multiple-choice",
    question: "Which of the following 3D printing brands is NOT Chinese?",
    options: ["Creality", "Anycubic", "Prusa", "Elegoo"],
    correct: 2,
    explanation: "Prusa is a Czech company founded by Josef Prusa. Creality, Anycubic, and Elegoo are all Chinese brands."
  },
  {
    type: "multiple-choice",
    question: "What is the national animal of Scotland?",
    options: ["Lion", "Dragon", "Unicorn", "Eagle"],
    correct: 2,
    explanation: "The unicorn is Scotland's national animal, symbolizing purity and power."
  },
  {
    type: "multiple-choice",
    question: "Which planet has the shortest day in our solar system?",
    options: ["Mercury", "Earth", "Jupiter", "Mars"],
    correct: 2,
    explanation: "Jupiter has the shortest day at about $10$ hours despite being the largest planet."
  },
  {
    type: "multiple-choice",
    question: "What color are airplane black boxes actually?",
    options: ["Black", "Orange", "Yellow", "Red"],
    correct: 1,
    explanation: "Flight recorders are actually bright orange to make them easier to find after a crash."
  },
  {
    type: "multiple-choice",
    question: "Which tech company was originally called 'BackRub'?",
    options: ["Facebook", "Amazon", "Google", "Twitter"],
    correct: 2,
    explanation: "Google was originally called BackRub, named after its analysis of the web's 'backlinks'."
  },
  {
    type: "multiple-choice",
    question: "How many times can you fold a piece of paper in half (maximum)?",
    options: ["$5$ times", "$7$ times", "$12$ times", "Unlimited"],
    correct: 2,
    explanation: "The world record is $12$ folds, achieved by Britney Gallivan in $2002$ using a very long sheet of paper."
  },
  {
    type: "multiple-choice",
    question: "What was the first computer virus called?",
    options: ["ILOVEYOU", "Creeper", "Melissa", "MyDoom"],
    correct: 1,
    explanation: "Creeper was created in $1971$ as an experimental self-replicating program. It displayed 'I'm the creeper, catch me if you can!'"
  },
  {
    type: "multiple-choice",
    question: "Which company's logo has exactly $4$ colors?",
    options: ["Apple", "Microsoft", "IBM", "Intel"],
    correct: 1,
    explanation: "Microsoft's logo uses $4$ colors: red, green, blue, and yellow in its four squares."
  },
  {
    type: "multiple-choice",
    question: "What does the '__(double underscore) mean in Python?",
    options: ["Error", "Dunder (magic method)", "Private variable", "Deprecated"],
    correct: 1,
    explanation: "'Dunder' stands for 'double underscore' - these are special/magic methods in Python like __init__."
  },
  {
    type: "multiple-choice",
    question: "Which programming language is named after a type of coffee?",
    options: ["Python", "Ruby", "Java", "Go"],
    correct: 2,
    explanation: "Java is named after Java coffee. The language's logo is even a coffee cup!"
  },
];

export const QUIZ_CONFIG: QuizConfig = {
  questionsPerRound: 9,  // 8 regular + 1 bonus question per session
  requiredScoreToUnlock: 100,  // Not used anymore but kept for compatibility
  totalRounds: 1,  // Single pool, no rounds
  shuffleQuestions: true,
  shuffleOptions: true,
  timeLimitMinutes: 3,
};
