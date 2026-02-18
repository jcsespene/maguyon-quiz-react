/**
 * MSYS 51: IT Infrastructure - Module 2 Question Pool
 * Topics: Processor, Survey of Processor Technology, Process Management & Virtualization
 * Single pool of questions - 8 random questions selected each session + 1 bonus
 * All question types: multiple-choice, true-false, fill-blank, fill-blank-inline, arrangement, statement-ab
 */

import type { Question, QuizConfig } from '@/types/quiz';

// Single pool of all questions
export const QUESTION_POOL: Question[] = [
  // ============================================
  // M2.1 — THE CENTRAL PROCESSING UNIT
  // ============================================
  {
    type: "multiple-choice",
    question: "Which component is described as the fastest and most sophisticated in a computing system?",
    options: ["Memory", "CPU", "GPU", "Motherboard"],
    correct: 1,
    explanation: "The CPU is the fastest and most sophisticated component, packed with transistors and communicating with other units."
  },
  {
    type: "fill-blank",
    question: "Machine-level instructions supported by a particular CPU are called an ___.",
    correct: ["instruction set", "Instruction Set", "Instruction set"],
    explanation: "An instruction set is the collection of machine-level instructions that a CPU supports."
  },
  {
    type: "true-false",
    question: "Intel and AMD CPUs are compatible because they _implement instructions the same way_.",
    correctWord: "support the same instruction set",
    explanation: "Intel and AMD support the same instruction set (x86/x64), but they implement each instruction differently depending on their architecture."
  },
  {
    type: "statement-ab",
    statements: [
      "Intel and AMD CPUs support the same instruction set, making them compatible.",
      "Intel and AMD implement each instruction in the exact same way."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — they support the same instruction set. Statement 2 is FALSE — they implement instructions differently."
  },
  {
    type: "multiple-choice",
    question: "What happens if a CPU is asked to perform something outside its instruction set?",
    options: ["It crashes permanently", "It will not be able to fulfill the task", "It translates automatically", "It skips to the next instruction"],
    correct: 1,
    explanation: "If asked something outside its instruction set, the CPU will not be able to fulfill the task."
  },
  {
    type: "fill-blank",
    question: "Apple ___ allows Windows applications to run on Apple Silicon by adding a translation layer above the instruction set.",
    correct: ["Rosetta", "rosetta"],
    explanation: "Apple Rosetta translates Windows-based instructions into Apple Silicon instructions, similar to Java Virtual Machine (JVM)."
  },
  {
    type: "multiple-choice",
    question: "Rosetta is most similar to which technology in concept?",
    options: ["Linux Kernel", "Java Virtual Machine (JVM)", "Windows Defender", "BIOS"],
    correct: 1,
    explanation: "Rosetta is similar to Java Virtual Machine (JVM) — both provide a translation layer to run software on different architectures."
  },
  {
    type: "true-false",
    question: "A program written for one instruction set _will natively run_ on a different instruction set.",
    correctWord: "will NOT natively run",
    explanation: "Programs written for one instruction set will not natively run on a different one. They may execute through translation layers but not natively."
  },

  // ============================================
  // M2.1 — PROCESSING IN CHUNKS
  // ============================================
  {
    type: "fill-blank",
    question: "A fixed-sized data unit that a hardware component can handle is called a ___.",
    correct: ["Word", "word"],
    explanation: "A Word is a fixed-sized data unit that hardware can handle, measured in bits."
  },
  {
    type: "multiple-choice",
    question: "What determines the size of one word?",
    options: ["Clock speed", "Word length", "Cache size", "Number of cores"],
    correct: 1,
    explanation: "Word length determines the size of one word and is specified in bits."
  },
  {
    type: "fill-blank",
    question: "A 64-bit CPU is capable of processing ___ bytes of data at a time.",
    correct: ["8", "eight"],
    explanation: "64 bits ÷ 8 bits per byte = 8 bytes of data."
  },
  {
    type: "multiple-choice",
    question: "How many bits are in 1 nibble?",
    options: ["2 bits", "4 bits", "8 bits", "16 bits"],
    correct: 1,
    explanation: "1 nibble = 4 bits. 1 byte = 8 bits (two nibbles)."
  },
  {
    type: "statement-ab",
    statements: [
      "1 byte equals 8 bits.",
      "1 nibble equals 8 bits."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE (1 byte = 8 bits). Statement 2 is FALSE (1 nibble = 4 bits)."
  },

  // ============================================
  // M2.1 — THE CPU CLOCK
  // ============================================
  {
    type: "fill-blank",
    question: "The CPU clock is a circuit that generates a signal at regular intervals called ___.",
    correct: ["cycles", "Cycles", "clock cycles", "Clock cycles"],
    explanation: "The CPU clock generates signals at regular intervals (cycles) during which CPU tasks are performed."
  },
  {
    type: "multiple-choice",
    question: "What does the CPU clock provide for the processor?",
    options: ["Extra memory", "A timing mechanism to carry out tasks", "Internet connectivity", "Data encryption"],
    correct: 1,
    explanation: "The CPU clock provides the timing mechanism for a processor to carry out its tasks, like a metronome."
  },
  {
    type: "true-false",
    question: "The CPU clock alternates between _3 states_ during operation.",
    correctWord: "2 states",
    explanation: "The CPU clock alternates between 2 states: 0 (off/absence of electricity) and 1 (on/presence of electricity)."
  },
  {
    type: "multiple-choice",
    question: "In CPU clock states, what does '0' represent?",
    options: ["On — presence of electricity", "Off — absence of electricity", "Idle state", "Error state"],
    correct: 1,
    explanation: "0 = off = absence of electricity. 1 = on = presence of electricity."
  },
  {
    type: "fill-blank",
    question: "Clock cycles are measured in ___, a unit of electrical vibrations.",
    correct: ["Hertz", "hertz", "Hz", "hz"],
    explanation: "Clock cycles are measured in Hertz (Hz), a unit of electrical vibrations."
  },
  {
    type: "multiple-choice",
    question: "How many cycles per second does 1 Hz represent?",
    options: ["0 cycles", "1 cycle", "1,000 cycles", "1 million cycles"],
    correct: 1,
    explanation: "1 Hz = 1 cycle per second. From 0 to 1 then back to 0."
  },
  {
    type: "multiple-choice",
    question: "How many cycles per second is 3 GHz?",
    options: ["3 million", "3 hundred million", "3 billion", "3 trillion"],
    correct: 2,
    explanation: "3 GHz = 3 billion cycles per second."
  },
  {
    type: "fill-blank",
    question: "2.4 MHz equals ___ cycles per second.",
    correct: ["2,400,000", "2400000", "2.4 million"],
    explanation: "1 MHz = 1,000,000 cycles per second, so 2.4 MHz = 2,400,000 cycles per second."
  },

  // ============================================
  // M2.1 — MULTIPROCESSOR
  // ============================================
  {
    type: "fill-blank",
    question: "A multiprocessor has multiple computing units in one integrated circuit, where each unit is called a ___.",
    correct: ["core", "Core"],
    explanation: "Core is coined to mean one processor in an integrated circuit (IC)."
  },
  {
    type: "multiple-choice",
    question: "In a quad-core CPU, how many processes can execute simultaneously?",
    options: ["1", "2", "4", "8"],
    correct: 2,
    explanation: "Quad-core means 4 cores, so 4 processes can execute simultaneously."
  },
  {
    type: "fill-blank",
    question: "The technique where a single core dedicates a slice of time to each task by rapidly switching between them is called ___.",
    correct: ["time slicing", "Time slicing", "Time Slicing"],
    explanation: "Time slicing is when a core dedicates a slice of time to each task, switching between processes so fast it appears simultaneous."
  },
  {
    type: "statement-ab",
    statements: [
      "A process can only execute in one computing core at a time.",
      "A computing core can execute multiple processes simultaneously."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — a core can only execute 1 process at a given time."
  },
  {
    type: "multiple-choice",
    question: "CPUs with multiple cores are designed to improve which of the following?",
    options: ["Only performance", "Performance, efficiency, and specialized tasks (like neural engine)", "Only battery life", "Only cooling"],
    correct: 1,
    explanation: "Multiple cores improve performance, efficiency (battery life), and enable specialized tasks like the neural engine for fingerprint handling."
  },

  // ============================================
  // M2.1 — MULTITHREADING
  // ============================================
  {
    type: "fill-blank",
    question: "Each part of a process that can execute simultaneously with other parts is called a ___.",
    correct: ["thread", "Thread"],
    explanation: "A thread is a part of a process that can execute simultaneously with other threads."
  },
  {
    type: "multiple-choice",
    question: "A quad-core CPU with 2 threads per core can handle how many simultaneous threads in total?",
    options: ["2", "4", "6", "8"],
    correct: 3,
    explanation: "4 cores × 2 threads per core = 8 simultaneous threads."
  },
  {
    type: "true-false",
    question: "The _hardware alone_ supports threads without needing the OS.",
    correctWord: "OS works with hardware",
    explanation: "The OS works with hardware to support threads — both are needed."
  },
  {
    type: "multiple-choice",
    question: "If a quad-core CPU supports 2 threads per core, but Process A has 4 threads assigned to one core, what happens?",
    options: ["All 4 threads run simultaneously", "Time slicing among the 4 threads", "The extra threads are discarded", "The process crashes"],
    correct: 1,
    explanation: "Since only 2 threads can run at a time per core, the core must time-slice among the 4 threads."
  },

  // ============================================
  // M2.1 — MANUFACTURING & MOUNTING
  // ============================================
  {
    type: "true-false",
    question: "Manufacturing challenges _decrease_ as transistor size decreases.",
    correctWord: "increase",
    explanation: "Manufacturing challenges increase as transistor size decreases — smaller transistors are more complex and difficult to fabricate."
  },
  {
    type: "statement-ab",
    statements: [
      "Soldered CPUs are easy to upgrade.",
      "Socketed CPUs are upgradable but may have loose parts over time."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — soldered CPUs are NOT easy to upgrade. Statement 2 is TRUE — socketed CPUs are upgradable but risk loose parts."
  },
  {
    type: "multiple-choice",
    question: "What does LGA stand for in CPU mounting?",
    options: ["Large Grid Architecture", "Land Grid Array", "Logical Gate Array", "Low Gauge Adapter"],
    correct: 1,
    explanation: "LGA = Land Grid Array, featuring flat/circular connectors at the bottom. Most CPUs today use LGA."
  },
  {
    type: "multiple-choice",
    question: "Which CPU mounting type uses flat, half-sphere connectors at the bottom?",
    options: ["PGA (Pin Grid Array)", "LGA (Land Grid Array)", "BGA (Ball Grid Array)", "ZIF (Zero Insertion Force)"],
    correct: 1,
    explanation: "LGA (Land Grid Array) has flat and circular (half sphere) connectors at the bottom and is used by most CPUs today."
  },
  {
    type: "fill-blank",
    question: "PGA stands for ___ Grid Array.",
    correct: ["Pin", "pin"],
    explanation: "PGA = Pin Grid Array, an alternative to LGA for CPU mounting."
  },

  // ============================================
  // M2.1 — INSTRUCTION SET ARCHITECTURE
  // ============================================
  {
    type: "multiple-choice",
    question: "What is the sample instruction set architecture used by both Intel and AMD?",
    options: ["ARM", "x86", "RISC-V", "MIPS"],
    correct: 1,
    explanation: "x86 is the instruction set used by both Intel and AMD (32-bit), with x64 being the 64-bit version."
  },
  {
    type: "fill-blank",
    question: "The x86 instruction set architecture handles ___ bits.",
    correct: ["32", "thirty-two"],
    explanation: "x86 is a 32-bit architecture. x64 is the 64-bit version."
  },

  // ============================================
  // M2.2 — SYSTEM ON A CHIP (SOC)
  // ============================================
  {
    type: "fill-blank",
    question: "A chip that integrates key components like CPU, cache, memory, and GPU into one unit is called a ___.",
    correct: ["System on a Chip", "system on a chip", "SOC", "SoC", "soc"],
    explanation: "System on a Chip (SOC) integrates key components into one chip, replacing dozens of separate chips."
  },
  {
    type: "arrangement",
    question: "Arrange the benefits of SOC in the order presented in the lecture:",
    items: ["Smaller devices", "Longer battery life", "Less heat"],
    correct: [0, 1, 2],
    explanation: "The lecture lists: Smaller devices, Longer battery life, Less heat."
  },
  {
    type: "multiple-choice",
    question: "SOC is most commonly found in which type of device?",
    options: ["Desktop PCs", "Servers", "Mobile devices", "Mainframes"],
    correct: 2,
    explanation: "SOC is common for mobile devices (phones) due to portability — integrating components into one chip enables smaller form factors."
  },
  {
    type: "statement-ab",
    statements: [
      "An SOC replaces dozens of separate chips by integrating key components into one.",
      "SOC technology is primarily designed for desktop computers."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — SOC is primarily used in mobile devices, set-top boxes, and embedded processors."
  },

  // ============================================
  // M2.2 — OVERCLOCKING
  // ============================================
  {
    type: "fill-blank",
    question: "___ means going beyond the recommended clock frequency of a CPU or GPU.",
    correct: ["Overclocking", "overclocking"],
    explanation: "Overclocking is going beyond the recommended clock frequency, mainly for GPUs and CPUs."
  },
  {
    type: "multiple-choice",
    question: "Which of the following is NOT an issue caused by overclocking?",
    options: ["Excessive heat", "Synchronization problems with main memory", "Increased battery life", "OS instability"],
    correct: 2,
    explanation: "Overclocking causes heat, memory sync issues, OS instability, and application issues. It does NOT increase battery life."
  },
  {
    type: "true-false",
    question: "Overclocking can potentially _extend_ the lifetime of your hardware.",
    correctWord: "shorten",
    explanation: "Overclocking can potentially shorten the lifetime of your hardware."
  },
  {
    type: "fill-blank",
    question: "The opposite of overclocking is ___, which saves battery and cools down the system.",
    correct: ["underclocking", "Underclocking"],
    explanation: "Underclocking is the opposite of overclocking — it saves battery and helps cool down the system."
  },
  {
    type: "multiple-choice",
    question: "When a system automatically reduces performance to prevent hardware damage from overheating, this is called:",
    options: ["Overclocking", "Underclocking", "Throttling down", "Turbo Boost"],
    correct: 2,
    explanation: "Throttling down is when the system reduces performance because it has reached its thermal threshold, protecting itself from damage."
  },
  {
    type: "fill-blank",
    question: "___ overclocking only exceeds normal speeds for short bursts depending on processing requirements.",
    correct: ["Dynamic", "dynamic"],
    explanation: "Dynamic overclocking goes beyond recommended speed only for short periods. Example: Intel Turbo Boost."
  },
  {
    type: "multiple-choice",
    question: "Which technology is an example of dynamic overclocking?",
    options: ["MSI Afterburner", "Intel Turbo Boost", "AMD Rosetta", "Nvidia DLSS"],
    correct: 1,
    explanation: "Intel Turbo Boost is an example of dynamic overclocking — it exceeds normal speeds for short bursts."
  },

  // ============================================
  // M2.2 — COOLING SYSTEMS
  // ============================================
  {
    type: "multiple-choice",
    question: "Which cooling component uses intake and exhaust configuration to achieve ideal temperature inside the PC?",
    options: ["Heat sink", "Thermal paste", "Fan", "Vapor chamber"],
    correct: 2,
    explanation: "A Fan is an active air cooling component using intake and exhaust configuration."
  },
  {
    type: "arrangement",
    question: "Classify these cooling components: arrange from passive to active air cooling:",
    items: ["Heat sink", "Thermal paste", "Fan"],
    correct: [0, 1, 2],
    explanation: "Heat sink and thermal paste are passive components, while fan is an active component."
  },
  {
    type: "fill-blank",
    question: "___ is applied between the CPU and heat sink to maximize thermal conductivity by increasing the contact surface area.",
    correct: ["Thermal paste", "thermal paste", "Thermal Paste"],
    explanation: "Thermal paste is applied before the heat sink to maximize thermal conductivity between the CPU and heat sink."
  },
  {
    type: "multiple-choice",
    question: "What type of cooling uses a pump, radiator, liquid, and fan?",
    options: ["Active air cooling", "Passive air cooling", "Liquid cooling (AIO)", "Custom nitrogen cooling"],
    correct: 2,
    explanation: "Liquid cooling, also known as AIO (All-in-One), uses a pump, radiator, liquid, and fan to dissipate heat."
  },
  {
    type: "statement-ab",
    statements: [
      "Liquid cooling is about 5 degrees centigrade cooler than air cooling.",
      "Liquid cooling is quieter than air cooling."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — liquid cooling is actually noisier than air cooling. Air cooling is quiet."
  },
  {
    type: "multiple-choice",
    question: "A vapor chamber found in phones works by:",
    options: ["Using a fan to blow air", "Distributing hot air using two metal sheets with liquid packets", "Applying thermal paste externally", "Using nitrogen gas"],
    correct: 1,
    explanation: "A vapor chamber uses 2 metal sheets with packets of liquid to distribute hot air, commonly found in phones."
  },
  {
    type: "fill-blank",
    question: "AIO cooling stands for ___.",
    correct: ["All-in-One", "All in One", "all-in-one", "all in one"],
    explanation: "AIO = All-in-One cooling, a liquid cooling solution with pump, radiator, liquid, and fan."
  },

  // ============================================
  // M2.2 — CPU MANUFACTURERS
  // ============================================
  {
    type: "arrangement",
    question: "Arrange these CPU manufacturer categories as presented in the lecture:",
    items: ["Integrated Device Manufacturers (IDM)", "Fabless", "Pure Play"],
    correct: [0, 1, 2],
    explanation: "The three categories are: IDM (design + manufacture), Fabless (design only), Pure Play (manufacture only)."
  },
  {
    type: "multiple-choice",
    question: "Which type of manufacturer designs AND manufactures their own chips?",
    options: ["Fabless", "Pure Play", "Integrated Device Manufacturer (IDM)", "Foundry"],
    correct: 2,
    explanation: "IDMs (Integrated Device Manufacturers) design and manufacture their own chips. Examples: Intel, Samsung, IBM."
  },
  {
    type: "multiple-choice",
    question: "Which company is classified as a 'fabless' manufacturer?",
    options: ["Intel", "Samsung", "Apple", "TSMC"],
    correct: 2,
    explanation: "Apple is fabless — they design their own chips but outsource manufacturing. Other fabless companies include AMD and Nvidia."
  },
  {
    type: "fill-blank",
    question: "Companies that design their own chips but do NOT have fabrication facilities are called ___.",
    correct: ["fabless", "Fabless"],
    explanation: "Fabless companies design chips but outsource manufacturing to IDMs or pure play foundries. Examples: AMD, Apple, Nvidia."
  },
  {
    type: "multiple-choice",
    question: "Which of the following is a 'pure play' foundry?",
    options: ["Intel", "AMD", "Apple", "TSMC"],
    correct: 3,
    explanation: "TSMC and GlobalFoundries are pure play foundries — they manufacture chips for other companies."
  },
  {
    type: "statement-ab",
    statements: [
      "AMD is a fabless company that designs chips but outsources manufacturing.",
      "TSMC is an Integrated Device Manufacturer (IDM)."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — TSMC is a pure play foundry, not an IDM."
  },

  // ============================================
  // M2.2 — INTEL
  // ============================================
  {
    type: "fill-blank",
    question: "Intel was founded in ___ by Robert Noyce and Gordon Moore.",
    correct: ["1968"],
    explanation: "Intel was founded in 1968 by Robert Noyce and Gordon Moore."
  },
  {
    type: "multiple-choice",
    question: "Which Intel CPU lineup is designed for servers?",
    options: ["Core", "Atom", "Xeon", "Intel Processor"],
    correct: 2,
    explanation: "Intel Xeon is for servers. Core is for workstations/desktops, Atom is for embedded systems."
  },
  {
    type: "multiple-choice",
    question: "Intel Atom processors are designed for which use case?",
    options: ["High-end gaming", "Servers", "Embedded systems like microwaves and low-end tablets", "Professional workstations"],
    correct: 2,
    explanation: "Intel Atom is for embedded systems like microwaves, refrigerators, and low-end tablets."
  },
  {
    type: "fill-blank",
    question: "Intel is working on ___ manufacturing technology, which is slightly thinner than the current 2 nm.",
    correct: ["18A", "18a"],
    explanation: "Intel is working on 18A (Angstrom) manufacturing technology, slightly thinner than the current 2 nm."
  },
  {
    type: "arrangement",
    question: "Arrange the Intel CPU lineup from server to embedded systems:",
    items: ["Xeon", "Core", "Intel Processor", "Atom"],
    correct: [0, 1, 2, 3],
    explanation: "Xeon (servers) → Core (workstation/desktop) → Intel Processor (formerly Pentium/Celeron) → Atom (embedded systems)."
  },

  // ============================================
  // M2.2 — AMD
  // ============================================
  {
    type: "fill-blank",
    question: "AMD was incorporated in May ___.",
    correct: ["1969"],
    explanation: "AMD (Advanced Micro Devices) was incorporated in May 1969."
  },
  {
    type: "multiple-choice",
    question: "Which AMD product line directly competes with Intel's Xeon for servers?",
    options: ["Ryzen", "Athlon", "Threadripper", "EPYC"],
    correct: 3,
    explanation: "AMD EPYC directly competes with Intel Xeon for server workloads."
  },
  {
    type: "multiple-choice",
    question: "AMD Ryzen Threadripper is designed for which use case?",
    options: ["Mobile devices", "Servers", "Productivity workstations", "Embedded systems"],
    correct: 2,
    explanation: "AMD Ryzen Threadripper is for productivity workstations."
  },
  {
    type: "statement-ab",
    statements: [
      "AMD processors are generally less expensive than Intel and more energy-efficient.",
      "AMD and Intel use completely different instruction sets, making them incompatible."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — AMD and Intel support the same instruction set (x86/x64)."
  },
  {
    type: "fill-blank",
    question: "AMD's ___ combines CPU, GPU, memory controller, and video encoder/decoder in a single chip.",
    correct: ["APU", "Accelerated Processing Unit", "accelerated processing unit"],
    explanation: "AMD's APU (Accelerated Processing Unit) combines CPU, GPU, memory controller, and video encoder/decoder in one chip."
  },
  {
    type: "multiple-choice",
    question: "Semi-custom APUs from AMD are used in which gaming consoles?",
    options: ["Nintendo Switch and Steam Deck", "PS5 and Xbox Series X", "PS4 and Xbox One", "Wii U and Game Boy"],
    correct: 1,
    explanation: "Semi-custom AMD APUs are used in PS5 and Xbox Series X — based on existing AMD models tweaked for gaming."
  },
  {
    type: "statement-ab",
    statements: [
      "An iGPU (integrated GPU) is combined with other components for compactness and portability.",
      "A discrete GPU is always less performant than an iGPU."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — iGPU is integrated for compact/portable devices. Statement 2 is FALSE — discrete GPUs offer higher performance."
  },

  // ============================================
  // M2.2 — TSMC & OTHER MANUFACTURERS
  // ============================================
  {
    type: "fill-blank",
    question: "TSMC was established in ___ and is the largest semiconductor foundry.",
    correct: ["1987"],
    explanation: "TSMC (Taiwan Semiconductor Manufacturing Company) was established in 1987."
  },
  {
    type: "multiple-choice",
    question: "Which of the following is NOT a prominent TSMC partner?",
    options: ["Apple", "AMD", "Intel", "Nvidia"],
    correct: 2,
    explanation: "TSMC's prominent partners include Apple, AMD, Nvidia, and Qualcomm. Intel manufactures its own chips (IDM)."
  },
  {
    type: "multiple-choice",
    question: "IBM's POWER10 processor uses which fabrication process?",
    options: ["14 nm", "10 nm", "7 nm", "5 nm"],
    correct: 2,
    explanation: "IBM POWER10 (2021) uses 7 nm process, up to 30 cores."
  },
  {
    type: "fill-blank",
    question: "IBM's POWER9 processor contains ___ billion transistors.",
    correct: ["8"],
    explanation: "IBM POWER9 has 8 billion transistors, up to 24 cores, up to 4 GHz, and up to 8 threads per core."
  },
  {
    type: "multiple-choice",
    question: "The Oracle SPARC M8 processor supports up to what maximum CPU frequency?",
    options: ["3.0 GHz", "4.0 GHz", "5.0 GHz", "6.0 GHz"],
    correct: 2,
    explanation: "Oracle SPARC M8 has max CPU frequency of 5.0 GHz, 32 cores, 8 threads/core, and 20 nm process."
  },

  // ============================================
  // M2.2 — PROCESS TECHNOLOGY & FEATURE SIZE
  // ============================================
  {
    type: "fill-blank",
    question: "Feature size in chip manufacturing is measured in ___.",
    correct: ["nanometers", "nano meters", "nm"],
    explanation: "Feature size is measured in nanometers (nm). The previous unit was micron."
  },
  {
    type: "multiple-choice",
    question: "As of 2026, what is the current leading-edge feature size for chip manufacturing?",
    options: ["5 nm", "3 nm", "2 nm", "1 nm"],
    correct: 2,
    explanation: "As of 2026, we are at 2 nm. Apple, Samsung, and AMD chips at this node are being released."
  },
  {
    type: "fill-blank",
    question: "1 nanometer equals ___ Angstroms.",
    correct: ["10"],
    explanation: "1 nm = 10 Angstroms (Å). Intel is rumored to have an 18A (Angstrom) chip."
  },
  {
    type: "true-false",
    question: "The _larger_ the transistor, the more difficult it is for manufacturers to produce.",
    correctWord: "smaller",
    explanation: "The smaller the transistor, the more difficult it is for manufacturers to achieve high yield."
  },

  // ============================================
  // M2.2 — MULTIPLE OPERATING SPEEDS & BUSES
  // ============================================
  {
    type: "fill-blank",
    question: "A ___ is a bunch of wires that transports data from one component to another.",
    correct: ["bus", "Bus", "system bus", "System bus"],
    explanation: "A system bus is a bunch of wires connecting components and carrying data between them."
  },
  {
    type: "multiple-choice",
    question: "What synchronizes the data transfer between the system bus and I/O bus?",
    options: ["CPU", "Cache", "Bus adapter", "Memory controller"],
    correct: 2,
    explanation: "The bus adapter synchronizes data transfer between the system bus and I/O bus."
  },
  {
    type: "true-false",
    question: "The CPU is _indirectly_ connected to memory through an I/O bus.",
    correctWord: "directly",
    explanation: "The CPU is directly connected to memory through the system bus, which connects the fastest components."
  },
  {
    type: "multiple-choice",
    question: "If I/O and system components share one bus, what problem can occur?",
    options: ["Increased speed", "Bottleneck — the system operates at the speed of its slowest component", "Reduced power usage", "Better synchronization"],
    correct: 1,
    explanation: "Mixing I/O and system in one bus causes bottlenecks — the system must operate at the slowest component's speed."
  },

  // ============================================
  // M2.2 — FUTURE TRENDS
  // ============================================
  {
    type: "fill-blank",
    question: "IBM's ___ chip is a neuromorphic processor packed with 4,096 cores that mimics human neurons.",
    correct: ["TrueNorth", "truenorth", "True North"],
    explanation: "IBM's TrueNorth is a prototype neuromorphic chip with 4,096 cores, mimicking 1 million neurons and 256 million synapses."
  },
  {
    type: "multiple-choice",
    question: "Neuromorphic processors like TrueNorth are specifically designed for which use case?",
    options: ["Gaming", "Web browsing", "AI (Artificial Intelligence)", "Word processing"],
    correct: 2,
    explanation: "Neuromorphic processors are meant for one use case: AI. They are Application Specific ICs (ASICs)."
  },
  {
    type: "fill-blank",
    question: "Quantum computers use ___ instead of traditional bits.",
    correct: ["qubits", "Qubits"],
    explanation: "Quantum computers use qubits — which can represent 1, 0, everything in between, and all at the same time."
  },
  {
    type: "multiple-choice",
    question: "What is the concept where two particles are related regardless of distance in quantum computing?",
    options: ["Quantum tunneling", "Quantum entanglement", "Quantum supremacy", "Quantum decoherence"],
    correct: 1,
    explanation: "Quantum entanglement is where 2 particles, however distant, are related and can predict each other's behavior."
  },
  {
    type: "statement-ab",
    statements: [
      "Quantum computers could break current security protocols once fully realized.",
      "Neuromorphic processors are more efficient than GPUs for AI workloads."
    ],
    correct: [1, 2],
    explanation: "Both statements are TRUE. Quantum computing threatens current security, and neuromorphic chips are more efficient than GPUs for AI."
  },
  {
    type: "fill-blank",
    question: "IBM's NorthPole (2023) neuromorphic chip has ___ cores and is built on a 12 nm process.",
    correct: ["256"],
    explanation: "NorthPole (2023) builds on TrueNorth with 256 cores, 12 nm process, and 22 billion transistors."
  },

  // ============================================
  // M2.3 — PROCESS DEFINITION
  // ============================================
  {
    type: "fill-blank",
    question: "Informally, a process is defined as a program in ___.",
    correct: ["execution", "Execution"],
    explanation: "A process is informally defined as a program in execution."
  },
  {
    type: "multiple-choice",
    question: "A device driver, when it executes, becomes a:",
    options: ["Thread", "Process", "Kernel", "Service"],
    correct: 1,
    explanation: "A driver is part of the OS that talks to the controller — when it executes, it becomes a process running in the background."
  },
  {
    type: "arrangement",
    question: "Arrange the I/O communication chain from highest to lowest level:",
    items: ["Driver", "Controller", "Device"],
    correct: [0, 1, 2],
    explanation: "Driver (OS level) → Controller (hardware interface) → Device itself."
  },

  // ============================================
  // M2.3 — PROCESS CONTROL BLOCK (PCB)
  // ============================================
  {
    type: "fill-blank",
    question: "Information about each process is kept in a ___, similar to how each student has their own student record.",
    correct: ["Process Control Block", "process control block", "PCB", "pcb"],
    explanation: "The Process Control Block (PCB) stores information about each process, like a student record."
  },
  {
    type: "multiple-choice",
    question: "Which of the following is NOT typically found in a Process Control Block?",
    options: ["Process ID (PID)", "Process state", "Internet connection speed", "Memory usage"],
    correct: 2,
    explanation: "PCB typically contains PID, process state, priority, memory usage, and assigned resources — not internet speed."
  },
  {
    type: "true-false",
    question: "When a process exits, its PCB _remains_ in the task manager for future reference.",
    correctWord: "is deleted",
    explanation: "When a process exits, its PCB is deleted. Running the process again creates a new PID and new PCB."
  },
  {
    type: "fill-blank",
    question: "Each process has a unique identifier called a ___ stored in its PCB.",
    correct: ["Process ID", "process ID", "PID", "pid"],
    explanation: "Process ID (PID) is a unique identifier for each process, stored in the PCB."
  },
  {
    type: "statement-ab",
    statements: [
      "When you run a process again after it exits, it gets the same Process ID as before.",
      "Process priority can differ — for example, a device driver has higher priority than Notepad."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — a new PID is assigned each time. Statement 2 is TRUE — priorities differ by process type."
  },

  // ============================================
  // M2.3 — THREADS
  // ============================================
  {
    type: "fill-blank",
    question: "Threads are also known as ___ processes.",
    correct: ["lightweight", "Lightweight", "light-weight"],
    explanation: "Threads are also known as lightweight processes."
  },
  {
    type: "multiple-choice",
    question: "A heavyweight process contains how many threads?",
    options: ["Zero", "One", "Two", "Many"],
    correct: 1,
    explanation: "A heavyweight process contains one thread. A multi-threaded process contains multiple threads."
  },
  {
    type: "true-false",
    question: "A thread can exist as a _stand-alone_ entity without a process.",
    correctWord: "process-dependent",
    explanation: "Threads are process-dependent — no thread is stand-alone. Threads exist within the context of a process, like rooms in a house."
  },
  {
    type: "fill-blank",
    question: "Threads that belong to the same process and share resources are called ___ threads.",
    correct: ["peer", "Peer"],
    explanation: "Peer threads belong to the same process and share resources and data."
  },
  {
    type: "statement-ab",
    statements: [
      "Peer threads belong to the same process and share resources.",
      "A thread can exist independently without belonging to any process."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — peer threads share resources. Statement 2 is FALSE — threads are always process-dependent."
  },
  {
    type: "multiple-choice",
    question: "What is a major challenge with multi-threaded processes?",
    options: ["They use less memory", "Thread synchronization — ensuring consistent outcomes regardless of execution order", "They run slower than single threads", "They cannot communicate"],
    correct: 1,
    explanation: "Synchronization is a major challenge — the application must produce the same result every time regardless of thread execution order."
  },

  // ============================================
  // M2.3 — TIME SLICING
  // ============================================
  {
    type: "multiple-choice",
    question: "In time slicing, how is the CPU shared among processes?",
    options: ["Shared in space", "Shared in time", "Shared in priority", "Not shared at all"],
    correct: 1,
    explanation: "CPU cores are shared in time (time slicing). Main memory is shared in space."
  },
  {
    type: "fill-blank",
    question: "CPU is shared in time, while main memory is shared in ___.",
    correct: ["space", "Space"],
    explanation: "CPU — shared in time. Main memory — shared in space."
  },
  {
    type: "true-false",
    question: "A CPU core can run _multiple processes_ simultaneously.",
    correctWord: "one process",
    explanation: "A CPU core can only run one process at a time — like a classroom that can only accommodate one class at a time."
  },
  {
    type: "multiple-choice",
    question: "In a hex-core CPU with 2 threads per core, how many total threads can run simultaneously?",
    options: ["6", "8", "10", "12"],
    correct: 3,
    explanation: "6 cores × 2 threads per core = 12 total simultaneous threads."
  },
  {
    type: "fill-blank",
    question: "The ___ uses hardware efficiently to manage how processes run in the cores.",
    correct: ["OS", "Operating System", "operating system"],
    explanation: "The OS uses hardware efficiently to manage how processes are assigned and run across cores."
  },

  // ============================================
  // M2.3 — INTER-PROCESS COMMUNICATION
  // ============================================
  {
    type: "fill-blank",
    question: "An endpoint for communication between processes over a network is called a ___.",
    correct: ["socket", "Socket"],
    explanation: "A socket is an endpoint for communication. A pair of communicating processes over a network requires two sockets."
  },
  {
    type: "multiple-choice",
    question: "How many sockets are needed for a pair of processes communicating over a network?",
    options: ["One", "Two", "Three", "Four"],
    correct: 1,
    explanation: "A pair of communicating processes over a network requires two sockets — one at each endpoint."
  },
  {
    type: "statement-ab",
    statements: [
      "Processes on the same machine need sockets to communicate with each other.",
      "Copy and paste between programs is an example of inter-process communication."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — processes on the same machine do NOT need sockets. Statement 2 is TRUE — copy/paste is IPC."
  },
  {
    type: "multiple-choice",
    question: "Which is a challenge of inter-process communication?",
    options: ["Faster execution", "Synchronization and security", "Lower memory usage", "Simpler code"],
    correct: 1,
    explanation: "IPC challenges include synchronization and security — e.g., copied data could be intercepted by a hacker before pasting."
  },

  // ============================================
  // M2.3 — VIRTUALIZATION
  // ============================================
  {
    type: "fill-blank",
    question: "Virtualization allows multiple virtual systems to be hosted on one hardware, implemented via a ___.",
    correct: ["hypervisor", "Hypervisor"],
    explanation: "Virtualization is implemented via a hypervisor — system software that makes virtualization possible."
  },
  {
    type: "true-false",
    question: "A _multi-boot system_ is a virtualized environment where all OS types run simultaneously.",
    correctWord: "multi-boot system is NOT virtualized",
    explanation: "A multi-boot system is NOT virtualized — you choose which OS to run at boot, and only one OS runs at a time."
  },
  {
    type: "statement-ab",
    statements: [
      "In virtualization, multiple OS types can run concurrently on a single machine.",
      "A multi-boot system runs multiple operating systems simultaneously."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — multi-boot only lets you choose one OS at startup."
  },
  {
    type: "multiple-choice",
    question: "What is a major disadvantage of virtualization?",
    options: ["It makes devices portable", "When the hardware breaks, everything breaks", "It reduces power consumption", "It makes software faster"],
    correct: 1,
    explanation: "When the host hardware breaks, all virtual systems break — a major disadvantage of virtualization."
  },

  // ============================================
  // M2.3 — HYPERVISORS
  // ============================================
  {
    type: "fill-blank",
    question: "A Type 1 hypervisor is also known as a ___ hypervisor because it sits directly on top of the hardware.",
    correct: ["baremetal", "bare metal", "bare-metal", "Baremetal"],
    explanation: "Type 1 = baremetal hypervisor — installed directly on top of the hardware, then OS is installed on top of it."
  },
  {
    type: "multiple-choice",
    question: "A Type 2 hypervisor is installed:",
    options: ["Directly on hardware", "As an application on top of an existing OS", "Inside the CPU", "In the BIOS"],
    correct: 1,
    explanation: "Type 2 hypervisor is installed as an application on top of an existing OS (host OS)."
  },
  {
    type: "fill-blank",
    question: "A Type 2 hypervisor is also known as a ___ hypervisor.",
    correct: ["hosted", "Hosted"],
    explanation: "Type 2 = hosted hypervisor — it acts like an emulator running on top of the host OS."
  },
  {
    type: "statement-ab",
    statements: [
      "Type 2 hypervisors are faster than Type 1 because they run on top of an existing OS.",
      "Type 2 hypervisors are slower because their performance depends on the host OS."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — Type 2 is slower, not faster. Statement 2 is TRUE — Type 2 performance depends on host OS."
  },
  {
    type: "arrangement",
    question: "Arrange the layers of a system using a Type 1 hypervisor from bottom to top:",
    items: ["Hardware", "Type 1 Hypervisor", "Operating System", "Applications"],
    correct: [0, 1, 2, 3],
    explanation: "Hardware → Type 1 Hypervisor (baremetal) → OS → Applications."
  },
  {
    type: "arrangement",
    question: "Arrange the layers of a system using a Type 2 hypervisor from bottom to top:",
    items: ["Hardware", "Host OS", "Type 2 Hypervisor", "Guest OS"],
    correct: [0, 1, 2, 3],
    explanation: "Hardware → Host OS → Type 2 Hypervisor (hosted) → Guest OS."
  },

  // ============================================
  // M2.3 — RESOURCES NEEDED BY PROCESSES
  // ============================================
  {
    type: "multiple-choice",
    question: "Which resource do processes need during execution and requires scheduling due to limited availability?",
    options: ["Main memory", "CPU", "I/O", "Network"],
    correct: 1,
    explanation: "CPU is needed during execution and requires scheduling because of limited number of cores."
  },
  {
    type: "arrangement",
    question: "Arrange the three resources needed by processes as listed in the lecture:",
    items: ["CPU", "Main memory", "I/O"],
    correct: [0, 1, 2],
    explanation: "CPU (execution, needs scheduling), Main memory (loaded from secondary storage), I/O (user interaction, file access)."
  },
  {
    type: "fill-blank",
    question: "Before a process can execute, it must be loaded from secondary storage into ___.",
    correct: ["main memory", "Main memory", "Main Memory", "RAM", "ram"],
    explanation: "Processes are loaded from secondary storage into main memory before they can execute."
  },

  // ============================================
  // ADDITIONAL MIXED QUESTIONS
  // ============================================
  {
    type: "multiple-choice",
    question: "The standard operating temperature threshold for a normal CPU is around:",
    options: ["50 degrees Celsius", "75 degrees Celsius", "100 degrees Celsius", "150 degrees Celsius"],
    correct: 2,
    explanation: "Standard CPU normal operating temperature is around 100 degrees Celsius."
  },
  {
    type: "fill-blank",
    question: "A ___ GPU is a separate unit outside the main chip that offers higher performance compared to an iGPU.",
    correct: ["discrete", "Discrete"],
    explanation: "A discrete GPU is a separate unit outside the main chip, delivering higher performance compared to an integrated GPU (iGPU)."
  },
  {
    type: "multiple-choice",
    question: "Which of the following best describes an ASIC?",
    options: ["A general-purpose CPU", "An Application Specific Integrated Circuit for one use case", "A type of operating system", "A cooling solution"],
    correct: 1,
    explanation: "ASIC = Application Specific Integrated Circuit — designed for one specific use case, more efficient than general-purpose hardware."
  },
  {
    type: "true-false",
    question: "Intel _currently manufactures_ chips for Apple.",
    correctWord: "does not manufacture",
    explanation: "Intel does not manufacture chips for Apple. Apple is fabless and uses TSMC as its foundry."
  },
  {
    type: "multiple-choice",
    question: "What does the phrase 'A chain is as strong as its weakest link' refer to in computing systems?",
    options: ["The fastest component sets the speed", "The system operates at the speed of its slowest component", "All components must be identical", "Only the CPU matters"],
    correct: 1,
    explanation: "This refers to how the system must operate at the speed of its slowest component when I/O and system share one bus."
  },
  {
    type: "fill-blank",
    question: "The standard layers in a system without a hypervisor are: Applications, ___, and Hardware.",
    correct: ["OS", "Operating System", "operating system"],
    explanation: "Standard layers: Applications → OS → Hardware. A hypervisor adds an additional layer."
  },
  {
    type: "multiple-choice",
    question: "If a thread misbehaves in a multi-threaded process, what happens to the other threads?",
    options: ["They continue normally", "They are left hanging", "They automatically restart", "They migrate to another core"],
    correct: 1,
    explanation: "A misbehaving thread can leave other threads hanging — this is a con of multi-threading."
  },
  {
    type: "fill-blank",
    question: "The Intel CPU product line formerly known as Pentium and Celeron is now simply called ___.",
    correct: ["Intel Processor", "intel processor"],
    explanation: "Intel Processor is the new name for what was formerly the Pentium and Celeron lineup."
  },
  {
    type: "multiple-choice",
    question: "The average human brain has approximately how many neurons?",
    options: ["1 million", "1 billion", "86 billion", "256 billion"],
    correct: 2,
    explanation: "The average human brain has approximately 86 billion neurons."
  },
  {
    type: "fill-blank-inline",
    template: "In CPU clock states, {{blank:0,1,2}} represents off (absence of electricity) and {{blank:0,1,2}} represents on (presence of electricity).",
    wordBank: ["0", "1", "2"],
    correct: ["0", "1"],
    explanation: "0 = off (absence of electricity), 1 = on (presence of electricity)."
  },
  {
    type: "fill-blank-inline",
    template: "Fabless companies {{blank:design,manufacture,distribute}} their own chips but do not {{blank:design,manufacture,distribute}} them.",
    wordBank: ["design", "manufacture", "distribute"],
    correct: ["design", "manufacture"],
    explanation: "Fabless companies design their own chips but outsource manufacturing to foundries."
  },
  {
    type: "fill-blank-inline",
    template: "CPU is shared in {{blank:time,space,priority}} while main memory is shared in {{blank:time,space,priority}}.",
    wordBank: ["time", "space", "priority"],
    correct: ["time", "space"],
    explanation: "CPU — shared in time (time slicing). Main memory — shared in space."
  },
  {
    type: "fill-blank-inline",
    template: "A Type 1 hypervisor is also called {{blank:baremetal,hosted,embedded}} while a Type 2 hypervisor is also called {{blank:baremetal,hosted,embedded}}.",
    wordBank: ["baremetal", "hosted", "embedded"],
    correct: ["baremetal", "hosted"],
    explanation: "Type 1 = baremetal (installed directly on hardware). Type 2 = hosted (installed on top of existing OS)."
  },
  {
    type: "fill-blank-inline",
    template: "A heavyweight process contains {{blank:one,two,many}} thread(s), while a multi-threaded process contains {{blank:one,two,many}} threads.",
    wordBank: ["one", "two", "many"],
    correct: ["one", "many"],
    explanation: "A heavyweight process has one thread. A multi-threaded process has many threads."
  },
  {
    type: "multiple-choice",
    question: "Nitrogen-based cooling is an example of which cooling category?",
    options: ["Air cooling", "Liquid cooling", "Custom cooling", "Passive cooling"],
    correct: 2,
    explanation: "Nitrogen-based cooling is a custom cooling solution, made for specific use cases like overclocking competitions."
  },
  {
    type: "true-false",
    question: "_Dynamic_ overclocking permanently increases the clock speed beyond the recommended frequency.",
    correctWord: "temporarily",
    explanation: "Dynamic overclocking only temporarily exceeds normal speeds for short bursts depending on processing requirements."
  },
  {
    type: "multiple-choice",
    question: "How many cores does IBM's Power11 processor have?",
    options: ["30 cores", "64 cores", "128 cores", "256 cores"],
    correct: 3,
    explanation: "IBM Power11 (released last year) has 256 cores."
  },
  {
    type: "fill-blank",
    question: "Oracle's last SPARC processor model was the SPARC ___, released in September 2017.",
    correct: ["M8", "m8"],
    explanation: "Oracle SPARC M8 was the last model (Sept 2017) with max 5.0 GHz, 32 cores, 8 threads/core."
  },
  {
    type: "statement-ab",
    statements: [
      "IBM manufactures their own POWER chips specifically for servers.",
      "Oracle continues to release new SPARC processors every year."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — IBM is an IDM making server chips. Statement 2 is FALSE — SPARC M8 (2017) was the last model; future is unknown."
  },
  {
    type: "multiple-choice",
    question: "Which of the following is an advantage of air cooling?",
    options: ["It is very compact", "It is quiet", "It provides the best cooling", "It uses liquid"],
    correct: 1,
    explanation: "Air cooling is quiet but bulky. Liquid cooling is noisier but more compact and about 5 degrees cooler."
  },
  {
    type: "fill-blank",
    question: "A clock ___ is the interval from the start of one pulse to the beginning of the next.",
    correct: ["cycle", "Cycle"],
    explanation: "A clock cycle is the interval between the start of a pulse to the beginning of the next."
  },
  {
    type: "multiple-choice",
    question: "What does MSI Afterburner do?",
    options: ["It is a cooling system", "It is a software tool for overclocking", "It is a CPU manufacturer", "It is an operating system"],
    correct: 1,
    explanation: "MSI Afterburner is a software tool commonly used for overclocking — though overclocking is not recommended unless you know what you're doing."
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
    explanation: "Jupiter has the shortest day at about 10 hours despite being the largest planet."
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
    options: ["5 times", "7 times", "12 times", "Unlimited"],
    correct: 2,
    explanation: "The world record is 12 folds, achieved by Britney Gallivan in 2002 using a very long sheet of paper."
  },
  {
    type: "multiple-choice",
    question: "What was the first computer virus called?",
    options: ["ILOVEYOU", "Creeper", "Melissa", "MyDoom"],
    correct: 1,
    explanation: "Creeper was created in 1971 as an experimental self-replicating program. It displayed 'I'm the creeper, catch me if you can!'"
  },
  {
    type: "multiple-choice",
    question: "Which company's logo has exactly 4 colors?",
    options: ["Apple", "Microsoft", "IBM", "Intel"],
    correct: 1,
    explanation: "Microsoft's logo uses 4 colors: red, green, blue, and yellow in its four squares."
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
