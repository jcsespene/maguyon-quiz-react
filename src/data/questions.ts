/**
 * MSYS 51: IT Infrastructure - Module 2 Question Pool
 * Topics: Processor, Survey of Processor Technology, Process Management & Virtualization
 *
 * Reframed to match professor's quiz style:
 *   - True/false with "close neighbor" wrong words (plausible terms from same topic)
 *   - Fill-blanks testing exact lecture phrasing
 *   - Fill-blank-inline with multiple blanks per sentence
 *   - Calculation questions
 *   - Statement questions testing subtle distinctions
 *
 * Single pool: 8 random questions selected each session + 1 bonus
 */

import type { Question, QuizConfig } from '@/types/quiz';

export const QUESTION_POOL: Question[] = [
  // ============================================
  // M2.1 — THE CENTRAL PROCESSING UNIT
  // ============================================
  {
    type: "true-false",
    question: "The CPU is the fastest and most sophisticated component in a computing system, packed with _capacitors_.",
    correctWord: "transistors",
    explanation: "The CPU is packed with transistors (not capacitors). Transistors are the fundamental switching elements inside a CPU."
  },
  {
    type: "true-false",
    question: "Two processors may have the same instruction set but _implement each instruction the same way_.",
    correctWord: "implement each instruction differently",
    explanation: "Two processors (e.g., Intel and AMD) may share the same instruction set but implement each instruction differently depending on their architecture."
  },
  {
    type: "true-false",
    question: "Intel and AMD CPUs are compatible because they _implement instructions the same way_.",
    correctWord: "support the same instruction set",
    explanation: "Intel and AMD are compatible because they support the same instruction set (x86/x64), but they implement each instruction differently."
  },
  {
    type: "true-false",
    question: "A program written for one instruction set _will natively run_ on a different instruction set.",
    correctWord: "will NOT natively run",
    explanation: "Programs written for one instruction set will not natively run on a different one — they may execute through translation layers like Rosetta, but not natively."
  },
  {
    type: "true-false",
    question: "Apple Rosetta is similar to the _Linux Kernel_ — both provide a translation layer.",
    correctWord: "Java Virtual Machine (JVM)",
    explanation: "Rosetta is similar to Java Virtual Machine (JVM) — both add a translation layer above the instruction set to allow software from one architecture to run on another."
  },
  {
    type: "fill-blank",
    question: "Machine-level instructions supported by a particular CPU are called an ___.",
    correct: ["instruction set", "Instruction Set", "Instruction set"],
    explanation: "An instruction set is the collection of machine-level instructions that a particular CPU supports."
  },
  {
    type: "fill-blank",
    question: "If a CPU is asked to perform something outside its instruction set, it will not be able to ___.",
    correct: ["fulfill the task", "fulfil the task"],
    explanation: "If asked something outside the instruction set, the CPU will not be able to fulfill the task."
  },
  {
    type: "fill-blank",
    question: "Apple ___ allows Windows applications to run on Apple Silicon by adding a translation layer above the instruction set.",
    correct: ["Rosetta", "rosetta"],
    explanation: "Apple Rosetta translates Windows-based instructions into Apple Silicon instructions, similar to JVM."
  },
  {
    type: "statement-ab",
    statements: [
      "Intel and AMD CPUs support the same instruction set, making them compatible.",
      "Intel and AMD implement each instruction in the exact same way."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — they share x86/x64. Statement 2 is FALSE — they implement instructions differently depending on architecture."
  },

  // ============================================
  // M2.1 — PROCESSING IN CHUNKS
  // ============================================
  {
    type: "true-false",
    question: "A word is a _variable-sized_ data unit that a hardware component can handle.",
    correctWord: "fixed-sized",
    explanation: "A word is a fixed-sized data unit that hardware can handle, usually determined in bits."
  },
  {
    type: "true-false",
    question: "Word length is specified in _bytes_.",
    correctWord: "bits",
    explanation: "Word length determines the size of one word and is specified in bits (not bytes)."
  },
  {
    type: "fill-blank",
    question: "A fixed-sized data unit that a hardware component can handle is called a ___.",
    correct: ["Word", "word"],
    explanation: "A Word is a fixed-sized data unit that hardware can handle."
  },
  {
    type: "fill-blank",
    question: "1 byte equals ___ bits.",
    correct: ["8", "eight"],
    explanation: "1 byte = 8 bits. 1 nibble = 4 bits."
  },
  {
    type: "fill-blank",
    question: "1 nibble equals ___ bits.",
    correct: ["4", "four"],
    explanation: "1 nibble = 4 bits (half a byte)."
  },
  {
    type: "fill-blank",
    question: "A 64-bit CPU is capable of processing ___ bytes of data at a time.",
    correct: ["8", "eight"],
    explanation: "64 bits ÷ 8 bits per byte = 8 bytes of data.",
    needsCalculator: true
  },
  {
    type: "statement-ab",
    statements: [
      "1 byte equals 8 bits.",
      "1 nibble equals 8 bits."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE (1 byte = 8 bits). Statement 2 is FALSE (1 nibble = 4 bits, not 8)."
  },

  // ============================================
  // M2.1 — THE CPU CLOCK
  // ============================================
  {
    type: "true-false",
    question: "The CPU clock alternates between _3 states_ during operation.",
    correctWord: "2 states",
    explanation: "The CPU clock alternates between 2 states: 0 (off/absence of electricity) and 1 (on/presence of electricity)."
  },
  {
    type: "true-false",
    question: "The CPU clock provides the _encryption mechanism_ for a processor to carry out its tasks.",
    correctWord: "timing mechanism",
    explanation: "The CPU clock provides the timing mechanism (like a metronome) for a processor to carry out its tasks."
  },
  {
    type: "true-false",
    question: "In CPU clock states, 0 represents the _presence_ of electricity.",
    correctWord: "absence",
    explanation: "0 = off = absence of electricity. 1 = on = presence of electricity."
  },
  {
    type: "true-false",
    question: "A clock cycle is complete when the signal returns to its _peak_ state.",
    correctWord: "original",
    explanation: "When the clock signal returns to its original state, it completes a cycle — this repeats indefinitely until you shut down the machine."
  },
  {
    type: "fill-blank",
    question: "The CPU clock is a circuit that generates a signal at regular intervals called ___.",
    correct: ["cycles", "Cycles", "clock cycles", "Clock cycles"],
    explanation: "The CPU clock generates signals at regular intervals (cycles) during which CPU tasks are performed."
  },
  {
    type: "fill-blank",
    question: "Clock cycles are measured in ___, a unit of electrical vibrations.",
    correct: ["Hertz", "hertz", "Hz", "hz"],
    explanation: "Clock cycles are measured in Hertz (Hz), a unit of electrical vibrations."
  },
  {
    type: "fill-blank",
    question: "1 Hz equals ___ cycle(s) per second.",
    correct: ["1", "one"],
    explanation: "1 Hz = 1 cycle per second. From 0 to 1 then back to 0."
  },
  {
    type: "fill-blank",
    question: "3 GHz equals ___ billion cycles per second.",
    correct: ["3", "three"],
    explanation: "3 GHz = 3 billion cycles per second."
  },
  {
    type: "fill-blank",
    question: "2.4 MHz equals ___ cycles per second.",
    correct: ["2,400,000", "2400000", "2.4 million"],
    explanation: "1 MHz = 1,000,000 cycles/second, so 2.4 MHz = 2,400,000 cycles per second.",
    needsCalculator: true
  },
  {
    type: "fill-blank",
    question: "A clock ___ is the interval from the start of one pulse to the beginning of the next.",
    correct: ["cycle", "Cycle"],
    explanation: "A clock cycle is the interval between the start of one pulse to the beginning of the next."
  },
  {
    type: "fill-blank-inline",
    template: "In CPU clock states, {{blank:0,1,2}} represents off (absence of electricity) and {{blank:0,1,2}} represents on (presence of electricity).",
    wordBank: ["0", "1", "2"],
    correct: ["0", "1"],
    explanation: "0 = off (absence of electricity), 1 = on (presence of electricity)."
  },

  // ============================================
  // M2.1 — MULTIPROCESSOR
  // ============================================
  {
    type: "true-false",
    question: "In a multiprocessor, each computing unit in one integrated circuit is called a _thread_.",
    correctWord: "core",
    explanation: "Core is coined to mean one processor (computing unit) in an integrated circuit. A thread is a subunit of a process, not the same thing."
  },
  {
    type: "true-false",
    question: "A computing core can execute _multiple processes_ simultaneously.",
    correctWord: "one process",
    explanation: "A computing core can only execute 1 process at a given time — like a classroom that can only accommodate 1 class at a time."
  },
  {
    type: "true-false",
    question: "A process can execute across _multiple computing cores_ at the same time.",
    correctWord: "one computing core",
    explanation: "A process can only execute in 1 computing core at a time."
  },
  {
    type: "fill-blank",
    question: "A multiprocessor has multiple computing units in one integrated circuit, where each unit is called a ___.",
    correct: ["core", "Core"],
    explanation: "Core is coined to mean one processor in an integrated circuit (IC)."
  },
  {
    type: "fill-blank",
    question: "The technique where a core dedicates a slice of time to each task by rapidly switching between them is called ___.",
    correct: ["time slicing", "Time slicing", "Time Slicing"],
    explanation: "Time slicing is when a core rapidly switches between processes, dedicating a slice of time to each."
  },
  {
    type: "statement-ab",
    statements: [
      "A process can only execute in one computing core at a time.",
      "A computing core can execute multiple processes simultaneously."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — one process per core. Statement 2 is FALSE — a core executes only 1 process at a time."
  },
  {
    type: "fill-blank-inline",
    template: "CPUs with multiple cores improve {{blank:performance,portability,compatibility}}, {{blank:efficiency,latency,bandwidth}}, and enable specialized tasks like the {{blank:neural engine,graphics card,sound card}}.",
    wordBank: ["performance", "efficiency", "neural engine", "portability", "latency", "graphics card"],
    correct: ["performance", "efficiency", "neural engine"],
    explanation: "Multiple cores improve performance, efficiency (battery life), and enable specialized tasks like the neural engine (e.g., fingerprint handling)."
  },

  // ============================================
  // M2.1 — MULTITHREADING
  // ============================================
  {
    type: "true-false",
    question: "The _hardware alone_ supports threads without needing the OS.",
    correctWord: "OS works with hardware",
    explanation: "The OS works with hardware to support threads — both are needed together."
  },
  {
    type: "true-false",
    question: "A quad-core CPU with 2 threads per core can handle a total of _4 simultaneous threads_.",
    correctWord: "8 simultaneous threads",
    explanation: "4 cores × 2 threads per core = 8 simultaneous threads."
  },
  {
    type: "fill-blank",
    question: "Each part of a process that can execute simultaneously with other parts is called a ___.",
    correct: ["thread", "Thread"],
    explanation: "A thread is a part of a process that can execute simultaneously with other threads."
  },
  {
    type: "fill-blank",
    question: "A quad-core CPU with 2 threads per core can handle ___ simultaneous threads in total.",
    correct: ["8", "eight"],
    explanation: "4 cores × 2 threads per core = 8 simultaneous threads.",
    needsCalculator: true
  },
  {
    type: "fill-blank",
    question: "If a core supports 2 threads but a process has 4 threads assigned to it, the core must use ___ among them.",
    correct: ["time slicing", "Time slicing"],
    explanation: "Since only 2 threads can run at a time per core, time slicing is used among the 4 threads."
  },

  // ============================================
  // M2.1 — MANUFACTURING & MOUNTING
  // ============================================
  {
    type: "true-false",
    question: "Manufacturing challenges _decrease_ as transistor size decreases.",
    correctWord: "increase",
    explanation: "Manufacturing challenges increase as transistor size decreases — smaller transistors are more complex and harder to fabricate with high yield."
  },
  {
    type: "true-false",
    question: "Soldered CPUs are _easy to upgrade_ and have no loose parts.",
    correctWord: "not easy to upgrade",
    explanation: "Soldered CPUs are NOT easy to upgrade — they are permanently attached. Socketed CPUs are the upgradable type."
  },
  {
    type: "true-false",
    question: "LGA stands for _Logical_ Grid Array.",
    correctWord: "Land",
    explanation: "LGA = Land Grid Array, featuring flat/circular (half sphere) connectors at the bottom. Most CPUs today use LGA."
  },
  {
    type: "fill-blank",
    question: "PGA stands for ___ Grid Array.",
    correct: ["Pin", "pin"],
    explanation: "PGA = Pin Grid Array, an alternative CPU mounting type to LGA."
  },
  {
    type: "fill-blank",
    question: "The ___ process usually determines a chip's capability.",
    correct: ["fabrication", "Fabrication", "manufacturing", "Manufacturing"],
    explanation: "The fabrication process usually determines a chip's capability."
  },
  {
    type: "statement-ab",
    statements: [
      "Soldered CPUs have no loose parts but are not easy to upgrade.",
      "Socketed CPUs are not upgradable but have no loose parts."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — soldered CPUs are permanent. Statement 2 is FALSE — socketed CPUs ARE upgradable but risk loose parts."
  },

  // ============================================
  // M2.1 — INSTRUCTION SET ARCHITECTURE
  // ============================================
  {
    type: "true-false",
    question: "The x86 instruction set handles _64_ bits.",
    correctWord: "32",
    explanation: "x86 handles 32 bits. x64 is the 64-bit version."
  },
  {
    type: "fill-blank",
    question: "The sample instruction set used by both Intel and AMD is ___.",
    correct: ["x86", "X86"],
    explanation: "x86 is the instruction set used by both Intel and AMD (32-bit). x64 is the 64-bit version."
  },
  {
    type: "fill-blank",
    question: "The x86 instruction set handles ___ bits.",
    correct: ["32", "thirty-two"],
    explanation: "x86 = 32 bits. x64 = 64-bit version."
  },
  {
    type: "fill-blank",
    question: "Inside the chip, the ___ is delicate and has connectors that allow it to be mounted to the motherboard.",
    correct: ["die", "Die"],
    explanation: "The die is inside the chip. It is delicate and has connectors for mounting to the motherboard."
  },

  // ============================================
  // M2.2 — MULTIPLE OPERATING SPEEDS & BUSES
  // ============================================
  {
    type: "true-false",
    question: "The CPU is _indirectly_ connected to memory through the I/O bus.",
    correctWord: "directly",
    explanation: "The CPU is directly connected to memory through the system bus, which connects the fastest components."
  },
  {
    type: "true-false",
    question: "The _I/O bus_ connects the fastest components of the system.",
    correctWord: "system bus",
    explanation: "The system bus connects the fastest components. The I/O bus handles slower peripherals like USB devices."
  },
  {
    type: "true-false",
    question: "Cache is a type of _storage_ inside the processor.",
    correctWord: "memory",
    explanation: "Cache is a type of memory inside the processor, not storage."
  },
  {
    type: "fill-blank",
    question: "A ___ is a bunch of wires that transports data from one component to another.",
    correct: ["bus", "Bus", "system bus", "System bus"],
    explanation: "A system bus is a bunch of wires connecting components and carrying data between them."
  },
  {
    type: "fill-blank",
    question: "The ___ synchronizes the data transfer between the system bus and I/O bus.",
    correct: ["bus adapter", "Bus adapter", "Bus Adapter"],
    explanation: "The bus adapter synchronizes data transfer between the system bus and I/O bus."
  },
  {
    type: "fill-blank",
    question: "If I/O and system components share one bus, a ___ occurs because the system must operate at the speed of its slowest component.",
    correct: ["bottleneck", "Bottleneck"],
    explanation: "Mixing I/O and system in one bus causes bottlenecks — 'a chain is as strong as its weakest link.'"
  },

  // ============================================
  // M2.2 — PROCESS TECHNOLOGY & FEATURE SIZE
  // ============================================
  {
    type: "true-false",
    question: "Feature size in chip manufacturing is measured in _microns_.",
    correctWord: "nanometers",
    explanation: "Feature size is currently measured in nanometers (nm). Micron was the previous unit."
  },
  {
    type: "true-false",
    question: "The _larger_ the transistor, the more difficult it is for manufacturers to produce.",
    correctWord: "smaller",
    explanation: "The smaller the transistor, the more difficult it is for manufacturers to achieve high yield."
  },
  {
    type: "fill-blank",
    question: "As of 2026, the leading-edge feature size for chip manufacturing is ___ nm.",
    correct: ["2"],
    explanation: "As of 2026, we are at 2 nm. Apple, Samsung, and AMD chips at this node are being released."
  },
  {
    type: "fill-blank",
    question: "1 nanometer equals ___ Angstroms.",
    correct: ["10", "ten"],
    explanation: "1 nm = 10 Angstroms (Å). Intel is rumored to have an 18A (Angstrom) chip."
  },
  {
    type: "fill-blank",
    question: "The previous unit for measuring feature size before nanometers was the ___.",
    correct: ["micron", "Micron"],
    explanation: "The previous unit for feature size was micron, now replaced by nanometers."
  },

  // ============================================
  // M2.2 — SYSTEM ON A CHIP (SOC)
  // ============================================
  {
    type: "true-false",
    question: "An SOC replaces dozens of separate chips by integrating key components into one, primarily designed for _desktop computers_.",
    correctWord: "mobile devices",
    explanation: "SOC is primarily used for mobile devices, set-top boxes, and embedded processors — not desktops."
  },
  {
    type: "fill-blank",
    question: "A chip that integrates key components like CPU, cache, memory, and GPU into one unit is called a ___.",
    correct: ["System on a Chip", "system on a chip", "SOC", "SoC", "soc"],
    explanation: "System on a Chip (SOC) integrates key components into one chip, replacing dozens of separate chips."
  },
  {
    type: "fill-blank-inline",
    template: "The impact of SOC includes {{blank:smaller,larger,faster}} devices, {{blank:shorter,longer,same}} battery life, and {{blank:more,less,equal}} heat.",
    wordBank: ["smaller", "larger", "shorter", "longer", "more", "less"],
    correct: ["smaller", "longer", "less"],
    explanation: "SOC benefits: smaller devices, longer battery life, less heat."
  },
  {
    type: "statement-ab",
    statements: [
      "An SOC replaces dozens of separate chips by integrating key components into one.",
      "SOC technology is primarily designed for desktop computers."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE. Statement 2 is FALSE — SOC is primarily for mobile devices, set-top boxes, and embedded processors."
  },

  // ============================================
  // M2.2 — OVERCLOCKING
  // ============================================
  {
    type: "true-false",
    question: "Overclocking can potentially _extend_ the lifetime of your hardware.",
    correctWord: "shorten",
    explanation: "Overclocking can potentially shorten the lifetime of your hardware."
  },
  {
    type: "true-false",
    question: "_Dynamic_ overclocking permanently increases the clock speed beyond the recommended frequency.",
    correctWord: "temporarily",
    explanation: "Dynamic overclocking only temporarily exceeds normal speeds for short bursts depending on processing requirements."
  },
  {
    type: "true-false",
    question: "When the system _throttles up_, it reduces performance to protect itself from overheating.",
    correctWord: "throttles down",
    explanation: "Throttling down is when the system reduces performance because it has reached the thermal threshold to protect itself."
  },
  {
    type: "true-false",
    question: "The opposite of overclocking is _turbo boosting_, which saves battery and cools down the system.",
    correctWord: "underclocking",
    explanation: "Underclocking is the opposite of overclocking — it saves battery and cools down the system."
  },
  {
    type: "fill-blank",
    question: "___ means going beyond the recommended clock frequency of a CPU or GPU.",
    correct: ["Overclocking", "overclocking"],
    explanation: "Overclocking is going beyond the recommended clock frequency, mainly for GPUs and CPUs."
  },
  {
    type: "fill-blank",
    question: "___ overclocking only exceeds normal speeds for short bursts depending on processing requirements.",
    correct: ["Dynamic", "dynamic"],
    explanation: "Dynamic overclocking goes beyond recommended speed only for short periods. Example: Intel Turbo Boost."
  },
  {
    type: "fill-blank",
    question: "Intel's ___ technology is an example of dynamic overclocking.",
    correct: ["Turbo Boost", "turbo boost", "Turbo boost"],
    explanation: "Intel Turbo Boost exceeds normal speeds for short bursts depending on processing requirements."
  },
  {
    type: "fill-blank",
    question: "The opposite of overclocking is ___, which saves battery and cools down the system.",
    correct: ["underclocking", "Underclocking"],
    explanation: "Underclocking reduces performance to save battery and cool down the system."
  },
  {
    type: "fill-blank-inline",
    template: "Overclocking issues include {{blank:heat,cooling,silence}} (1), synchronization with {{blank:main memory,cache,GPU}} (2), and instability of the {{blank:OS,BIOS,driver}} (3).",
    wordBank: ["heat", "cooling", "main memory", "cache", "OS", "BIOS"],
    correct: ["heat", "main memory", "OS"],
    explanation: "Overclocking issues: (1) Heat, (2) Main memory synchronization, (3) OS instability."
  },
  {
    type: "statement-ab",
    statements: [
      "Dynamic overclocking lasts for long sustained periods to maximize performance.",
      "Underclocking saves battery and cools down the system."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — dynamic overclocking only lasts for short bursts. Statement 2 is TRUE."
  },

  // ============================================
  // M2.2 — COOLING SYSTEMS
  // ============================================
  {
    type: "true-false",
    question: "In air cooling, a fan is a _passive_ component.",
    correctWord: "active",
    explanation: "A fan is an active air cooling component (uses intake and exhaust). Passive components include heat sinks, vapor chambers, and thermal paste."
  },
  {
    type: "true-false",
    question: "Liquid cooling (AIO) is _quieter_ than air cooling.",
    correctWord: "noisier",
    explanation: "Liquid cooling is actually noisier than air cooling. Air cooling's benefit is that it is quiet."
  },
  {
    type: "true-false",
    question: "A heat sink is an _active_ air cooling component.",
    correctWord: "passive",
    explanation: "A heat sink is a passive air cooling component (metal-based/aluminum). Fans are the active component."
  },
  {
    type: "true-false",
    question: "Thermal paste is applied to _decrease_ the surface area between the CPU and heat sink.",
    correctWord: "increase",
    explanation: "Thermal paste increases the contact surface area to maximize thermal conductivity between the CPU and heat sink."
  },
  {
    type: "fill-blank",
    question: "___ is applied between the CPU and heat sink to maximize thermal conductivity.",
    correct: ["Thermal paste", "thermal paste", "Thermal Paste"],
    explanation: "Thermal paste increases the contact surface area for maximum thermal conductivity between CPU and heat sink."
  },
  {
    type: "fill-blank",
    question: "AIO cooling stands for ___.",
    correct: ["All-in-One", "All in One", "all-in-one", "all in one"],
    explanation: "AIO = All-in-One cooling — liquid cooling with pump, radiator, liquid, and fan."
  },
  {
    type: "fill-blank",
    question: "A ___ in phones uses two metal sheets with packets of liquid to distribute hot air.",
    correct: ["vapor chamber", "Vapor chamber", "Vapor Chamber"],
    explanation: "A vapor chamber is a passive cooling solution in phones using 2 metal sheets with packets of liquid."
  },
  {
    type: "fill-blank-inline",
    template: "Air cooling is {{blank:quiet,noisy,compact}} but {{blank:bulky,compact,expensive}}, while liquid cooling is {{blank:quiet,noisy,bulky}} but about {{blank:5,10,15}} degrees centigrade cooler.",
    wordBank: ["quiet", "noisy", "bulky", "compact", "5", "10", "15"],
    correct: ["quiet", "bulky", "noisy", "5"],
    explanation: "Air cooling: quiet but bulky. Liquid cooling: noisy but ~5°C cooler."
  },
  {
    type: "statement-ab",
    statements: [
      "Liquid cooling is about 5 degrees centigrade cooler than air cooling.",
      "Liquid cooling is quieter than air cooling."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE (~5°C cooler). Statement 2 is FALSE — liquid cooling is noisier; air cooling is quiet."
  },
  {
    type: "fill-blank",
    question: "The standard operating temperature threshold for a normal CPU is around ___ degrees Celsius.",
    correct: ["100"],
    explanation: "Standard CPU normal operating temperature is around 100 degrees Celsius."
  },

  // ============================================
  // M2.2 — CPU MANUFACTURERS
  // ============================================
  {
    type: "true-false",
    question: "AMD is an _Integrated Device Manufacturer_ that designs and manufactures its own chips.",
    correctWord: "fabless company",
    explanation: "AMD is fabless — they design their own chips but outsource manufacturing. Intel, Samsung, and IBM are IDMs."
  },
  {
    type: "true-false",
    question: "TSMC is a _fabless_ company that designs chips but outsources manufacturing.",
    correctWord: "pure play foundry",
    explanation: "TSMC is a pure play foundry — they manufacture chips for other companies. Fabless companies like AMD and Apple design but don't manufacture."
  },
  {
    type: "true-false",
    question: "Apple is an _Integrated Device Manufacturer_ because it designs its own chips.",
    correctWord: "fabless company",
    explanation: "Apple is fabless — they design chips but outsource manufacturing to TSMC. IDMs like Intel both design AND manufacture."
  },
  {
    type: "fill-blank",
    question: "Companies that design their own chips but do NOT have fabrication facilities are called ___.",
    correct: ["fabless", "Fabless"],
    explanation: "Fabless companies design chips but outsource manufacturing. Examples: AMD, Apple, Nvidia."
  },
  {
    type: "fill-blank",
    question: "___ device manufacturers both design and manufacture their own chips.",
    correct: ["Integrated", "integrated"],
    explanation: "Integrated Device Manufacturers (IDMs) design and manufacture their own chips. Examples: Intel, Samsung, IBM."
  },
  {
    type: "fill-blank-inline",
    template: "Fabless companies {{blank:design,manufacture,distribute}} their own chips but do not {{blank:design,manufacture,distribute}} them.",
    wordBank: ["design", "manufacture", "distribute"],
    correct: ["design", "manufacture"],
    explanation: "Fabless companies design their own chips but outsource manufacturing to foundries."
  },
  {
    type: "statement-ab",
    statements: [
      "AMD is a fabless company that designs chips but outsources manufacturing.",
      "TSMC is an Integrated Device Manufacturer (IDM)."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — AMD is fabless. Statement 2 is FALSE — TSMC is a pure play foundry, not an IDM."
  },
  {
    type: "arrangement",
    question: "Arrange these CPU manufacturer categories as presented in the lecture:",
    items: ["Integrated Device Manufacturers (IDM)", "Fabless", "Pure Play"],
    correct: [0, 1, 2],
    explanation: "The three categories: IDM (design + manufacture), Fabless (design only), Pure Play (manufacture only)."
  },

  // ============================================
  // M2.2 — INTEL
  // ============================================
  {
    type: "true-false",
    question: "Intel was founded in _1969_ by Robert Noyce and Gordon Moore.",
    correctWord: "1968",
    explanation: "Intel was founded in 1968. AMD was incorporated in May 1969."
  },
  {
    type: "true-false",
    question: "Intel _Atom_ processors are designed for servers.",
    correctWord: "Xeon",
    explanation: "Intel Xeon is for servers. Atom is for embedded systems like microwaves and low-end tablets."
  },
  {
    type: "true-false",
    question: "Intel is working on _2 nm_ manufacturing technology as their next breakthrough.",
    correctWord: "18A (Angstrom)",
    explanation: "Intel is working on 18A (Angstrom) technology, which is slightly thinner than the current 2 nm."
  },
  {
    type: "fill-blank",
    question: "Intel was founded in ___ by Robert Noyce and Gordon Moore.",
    correct: ["1968"],
    explanation: "Intel was founded in 1968. AMD was incorporated in May 1969."
  },
  {
    type: "fill-blank",
    question: "The Intel CPU product line formerly known as Pentium and Celeron is now simply called ___.",
    correct: ["Intel Processor", "intel processor"],
    explanation: "Intel Processor replaced the Pentium and Celeron branding."
  },
  {
    type: "fill-blank",
    question: "Intel ___ processors are designed for embedded systems like microwaves and low-end tablets.",
    correct: ["Atom", "atom"],
    explanation: "Intel Atom is for embedded systems like microwaves, refrigerators, and low-end tablets."
  },
  {
    type: "arrangement",
    question: "Arrange the Intel CPU lineup from server to embedded systems:",
    items: ["Xeon", "Core", "Intel Processor", "Atom"],
    correct: [0, 1, 2, 3],
    explanation: "Xeon (servers) → Core (workstation/desktop) → Intel Processor (formerly Pentium/Celeron) → Atom (embedded)."
  },

  // ============================================
  // M2.2 — AMD
  // ============================================
  {
    type: "true-false",
    question: "AMD was incorporated in May _1968_.",
    correctWord: "1969",
    explanation: "AMD was incorporated in May 1969. Intel was founded in 1968."
  },
  {
    type: "true-false",
    question: "AMD _Threadripper_ directly competes with Intel's Xeon for servers.",
    correctWord: "EPYC",
    explanation: "AMD EPYC directly competes with Intel Xeon for servers. Threadripper is for productivity workstations."
  },
  {
    type: "true-false",
    question: "AMD's APU is made for _portability_ since it is directly connected to a power supply.",
    correctWord: "high performance (not portability)",
    explanation: "APU is directly connected to a power supply — it is NOT made to be portable, so it consumes a lot of energy. It delivers high performance for gaming."
  },
  {
    type: "fill-blank",
    question: "AMD was incorporated in May ___.",
    correct: ["1969"],
    explanation: "AMD (Advanced Micro Devices) was incorporated in May 1969."
  },
  {
    type: "fill-blank",
    question: "AMD's ___ combines CPU, GPU, memory controller, and video encoder/decoder in a single chip.",
    correct: ["APU", "Accelerated Processing Unit", "accelerated processing unit"],
    explanation: "AMD's APU (Accelerated Processing Unit) integrates CPU, GPU, memory controller, and video encoder/decoder."
  },
  {
    type: "fill-blank",
    question: "AMD ___ directly competes with Intel's Xeon for server workloads.",
    correct: ["EPYC", "epyc"],
    explanation: "AMD EPYC directly competes with Intel Xeon for servers."
  },
  {
    type: "fill-blank-inline",
    template: "An {{blank:iGPU,dGPU,APU}} is integrated for compactness and portability, while a {{blank:discrete,integrated,embedded}} GPU provides higher performance as a separate unit.",
    wordBank: ["iGPU", "dGPU", "discrete", "integrated", "embedded"],
    correct: ["iGPU", "discrete"],
    explanation: "iGPU = integrated GPU for compact/portable devices. Discrete GPU = separate unit with higher performance."
  },
  {
    type: "statement-ab",
    statements: [
      "An iGPU is combined with other components for compactness and portability.",
      "A discrete GPU is always less performant than an iGPU."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — iGPU is integrated. Statement 2 is FALSE — discrete GPUs offer higher performance."
  },
  {
    type: "statement-ab",
    statements: [
      "AMD processors are generally less expensive than Intel and more energy-efficient.",
      "AMD and Intel use completely different instruction sets, making them incompatible."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — AMD is cheaper and more energy-efficient. Statement 2 is FALSE — they support the same instruction set (x86/x64)."
  },

  // ============================================
  // M2.2 — TSMC, IBM, ORACLE
  // ============================================
  {
    type: "true-false",
    question: "TSMC was established in _1968_ and is the largest semiconductor foundry.",
    correctWord: "1987",
    explanation: "TSMC was established in 1987. Intel was founded in 1968."
  },
  {
    type: "true-false",
    question: "Intel is a prominent _TSMC partner_ alongside Apple, AMD, and Nvidia.",
    correctWord: "is NOT a TSMC partner",
    explanation: "Intel is an IDM (manufactures its own chips). TSMC's partners include Apple, AMD, Nvidia, and Qualcomm."
  },
  {
    type: "fill-blank",
    question: "TSMC was established in ___ and is the largest semiconductor foundry.",
    correct: ["1987"],
    explanation: "TSMC (Taiwan Semiconductor Manufacturing Company) was established in 1987."
  },
  {
    type: "fill-blank",
    question: "IBM's POWER9 processor contains ___ billion transistors.",
    correct: ["8"],
    explanation: "IBM POWER9: 8 billion transistors, up to 24 cores, up to 4 GHz, up to 8 threads per core."
  },
  {
    type: "fill-blank",
    question: "IBM's POWER10 (2021) uses a ___ nm fabrication process.",
    correct: ["7"],
    explanation: "IBM POWER10 (2021): 7 nm process, up to 30 cores."
  },
  {
    type: "fill-blank",
    question: "Oracle's last SPARC processor model was the SPARC ___, released in September 2017.",
    correct: ["M8", "m8"],
    explanation: "Oracle SPARC M8: max 5.0 GHz, 32 cores, 8 threads/core, 64 MB L3 cache, 20 nm process."
  },
  {
    type: "statement-ab",
    statements: [
      "IBM manufactures their own POWER chips specifically for servers.",
      "Oracle continues to release new SPARC processors every year."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — IBM is an IDM making server chips. Statement 2 is FALSE — SPARC M8 (2017) was the last model."
  },

  // ============================================
  // M2.2 — FUTURE TRENDS: NEUROMORPHIC & QUANTUM
  // ============================================
  {
    type: "true-false",
    question: "IBM's TrueNorth is packed with _256_ cores that mimic human neurons.",
    correctWord: "4,096",
    explanation: "TrueNorth has 4,096 cores. NorthPole (2023) has 256 cores."
  },
  {
    type: "true-false",
    question: "Neuromorphic processors are _less efficient_ than GPUs for AI workloads.",
    correctWord: "more efficient",
    explanation: "Neuromorphic processors are more efficient than GPUs for AI — they are ASICs (Application Specific ICs) optimized for one use case."
  },
  {
    type: "true-false",
    question: "Quantum computers use _bits_ that represent 1, 0, and everything in between.",
    correctWord: "qubits",
    explanation: "Quantum computers use qubits — which can represent 1, 0, everything in between, and all at the same time."
  },
  {
    type: "true-false",
    question: "Neuromorphic processors are general-purpose chips designed for _multiple use cases_.",
    correctWord: "one use case: AI",
    explanation: "Neuromorphic processors are ASICs meant for one use case: AI. They are not general-purpose."
  },
  {
    type: "fill-blank",
    question: "IBM's ___ chip is a neuromorphic processor packed with 4,096 cores that mimics human neurons.",
    correct: ["TrueNorth", "truenorth", "True North"],
    explanation: "IBM TrueNorth: prototype neuromorphic chip, 4,096 cores, mimics 1 million neurons and 256 million synapses."
  },
  {
    type: "fill-blank",
    question: "Quantum computers use ___ instead of traditional bits.",
    correct: ["qubits", "Qubits"],
    explanation: "Qubits can represent 1, 0, everything in between, and all at the same time."
  },
  {
    type: "fill-blank",
    question: "The concept where two particles are related regardless of distance in quantum computing is called quantum ___.",
    correct: ["entanglement", "Entanglement"],
    explanation: "Quantum entanglement: 2 particles, however distant, are related and can predict each other's behavior."
  },
  {
    type: "fill-blank",
    question: "IBM's NorthPole (2023) neuromorphic chip has ___ cores and is built on a 12 nm process.",
    correct: ["256"],
    explanation: "NorthPole (2023) builds on TrueNorth: 256 cores, 12 nm process, 22 billion transistors."
  },
  {
    type: "fill-blank",
    question: "The average human brain has approximately ___ billion neurons.",
    correct: ["86"],
    explanation: "The average human brain has approximately 86 billion neurons."
  },
  {
    type: "fill-blank",
    question: "Neuromorphic processors are a type of ___ — Application Specific Integrated Circuits designed for AI.",
    correct: ["ASIC", "asic"],
    explanation: "ASIC = Application Specific Integrated Circuit — more efficient and viable long-term for AI."
  },
  {
    type: "statement-ab",
    statements: [
      "Quantum computers could break current security protocols once fully realized.",
      "Neuromorphic processors are more efficient than GPUs for AI workloads."
    ],
    correct: [1, 2],
    explanation: "Both are TRUE. Quantum threatens current security. Neuromorphic chips are more efficient than GPUs for AI."
  },

  // ============================================
  // M2.3 — PROCESS DEFINITION
  // ============================================
  {
    type: "true-false",
    question: "A _controller_ is part of the OS that talks to the hardware and integrates with the OS.",
    correctWord: "driver",
    explanation: "A driver is part of the OS that talks to the controller. The controller is hardware that acts on behalf of the device."
  },
  {
    type: "true-false",
    question: "A _driver_ is hardware that acts on behalf of the device itself to communicate with more sophisticated parts.",
    correctWord: "controller",
    explanation: "A controller is hardware that acts on behalf of the device. A driver is the OS software that talks to the controller."
  },
  {
    type: "fill-blank",
    question: "Informally, a process is defined as a program in ___.",
    correct: ["execution", "Execution"],
    explanation: "A process is informally defined as a program in execution."
  },
  {
    type: "fill-blank-inline",
    template: "In I/O communication: the {{blank:driver,controller,device}} is part of the OS, the {{blank:driver,controller,device}} is hardware, and the {{blank:driver,controller,device}} is the peripheral itself.",
    wordBank: ["driver", "controller", "device"],
    correct: ["driver", "controller", "device"],
    explanation: "Driver (OS software) → Controller (hardware interface) → Device (peripheral itself)."
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
    type: "true-false",
    question: "When a process exits, its PCB _remains_ in the task manager for future reference.",
    correctWord: "is deleted",
    explanation: "When a process exits, its PCB is deleted. Running it again creates a new PID and new PCB."
  },
  {
    type: "true-false",
    question: "When you run a process again after it exits, it gets the _same Process ID_ as before.",
    correctWord: "a new Process ID",
    explanation: "A new PID is assigned each time you run a process. The old PCB is deleted when the process exits."
  },
  {
    type: "fill-blank",
    question: "Information about each process is kept in a ___, similar to how each student has their own student record.",
    correct: ["Process Control Block", "process control block", "PCB", "pcb"],
    explanation: "The Process Control Block (PCB) stores process info like PID, state, priority, memory usage, and resources."
  },
  {
    type: "fill-blank",
    question: "Each process has a unique identifier called a ___ stored in its PCB.",
    correct: ["Process ID", "process ID", "PID", "pid"],
    explanation: "Process ID (PID) is unique to each process and stored in the PCB."
  },
  {
    type: "statement-ab",
    statements: [
      "When you run a process again after it exits, it gets the same Process ID as before.",
      "Process priority can differ — for example, a device driver has higher priority than Notepad."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — new PID each time. Statement 2 is TRUE — different processes have different priorities."
  },

  // ============================================
  // M2.3 — THREADS
  // ============================================
  {
    type: "true-false",
    question: "Threads are also known as _heavyweight_ processes.",
    correctWord: "lightweight",
    explanation: "Threads are lightweight processes. A heavyweight process contains only one thread."
  },
  {
    type: "true-false",
    question: "A thread can exist as a _stand-alone_ entity without belonging to any process.",
    correctWord: "process-dependent",
    explanation: "Threads are process-dependent — no thread is stand-alone. Like rooms in a house, threads exist within a process."
  },
  {
    type: "true-false",
    question: "A _multi-threaded_ process contains one thread and operates at the per-process level.",
    correctWord: "heavyweight",
    explanation: "A heavyweight process contains one thread. A multi-threaded process contains multiple threads."
  },
  {
    type: "true-false",
    question: "T1 in Process B (which has only one thread) is a _stand-alone thread_.",
    correctWord: "not stand-alone",
    explanation: "Even with one thread, T1 still operates within Process B — no thread is stand-alone."
  },
  {
    type: "fill-blank",
    question: "Threads are also known as ___ processes.",
    correct: ["lightweight", "Lightweight", "light-weight"],
    explanation: "Threads are lightweight processes."
  },
  {
    type: "fill-blank",
    question: "A ___ process contains one thread, while a multi-threaded process contains multiple.",
    correct: ["heavyweight", "heavy-weight", "Heavyweight", "Heavy-weight"],
    explanation: "Heavyweight process = one thread. Multi-threaded process = multiple threads."
  },
  {
    type: "fill-blank",
    question: "Threads that belong to the same process and share resources are called ___ threads.",
    correct: ["peer", "Peer"],
    explanation: "Peer threads belong to the same process and share resources and data."
  },
  {
    type: "fill-blank-inline",
    template: "A heavyweight process contains {{blank:one,two,many}} thread(s), while a multi-threaded process contains {{blank:one,two,many}} threads.",
    wordBank: ["one", "two", "many"],
    correct: ["one", "many"],
    explanation: "Heavyweight = one thread. Multi-threaded = many threads."
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
    type: "fill-blank",
    question: "A major con of multi-threading is that a misbehaving thread will leave other threads ___.",
    correct: ["hanging", "Hanging"],
    explanation: "If one thread misbehaves, other threads will be left hanging — a disadvantage of multi-threading."
  },
  {
    type: "fill-blank",
    question: "Thread ___ ensures that an application produces the same result every time regardless of execution order.",
    correct: ["synchronization", "Synchronization"],
    explanation: "Synchronization ensures consistent outcomes regardless of which thread runs first."
  },

  // ============================================
  // M2.3 — TIME SLICING
  // ============================================
  {
    type: "true-false",
    question: "CPU is shared in _space_ while main memory is shared in time.",
    correctWord: "time",
    explanation: "CPU is shared in time (time slicing). Main memory is shared in space. This is reversed from what the question states."
  },
  {
    type: "true-false",
    question: "Main memory is shared in _time_ among processes.",
    correctWord: "space",
    explanation: "Main memory is shared in space. CPU is shared in time."
  },
  {
    type: "fill-blank-inline",
    template: "CPU is shared in {{blank:time,space,priority}} while main memory is shared in {{blank:time,space,priority}}.",
    wordBank: ["time", "space", "priority"],
    correct: ["time", "space"],
    explanation: "CPU — shared in time (time slicing). Main memory — shared in space."
  },
  {
    type: "fill-blank",
    question: "A CPU core can run ___ process(es) at a time.",
    correct: ["one", "1"],
    explanation: "A CPU core can run one process at a time — like a classroom that can only accommodate one class at a time."
  },
  {
    type: "fill-blank",
    question: "In a hex-core CPU with 2 threads per core, ___ total threads can run simultaneously.",
    correct: ["12", "twelve"],
    explanation: "6 cores × 2 threads per core = 12 total simultaneous threads.",
    needsCalculator: true
  },
  {
    type: "fill-blank",
    question: "The ___ uses hardware efficiently to manage how processes run in the cores.",
    correct: ["OS", "Operating System", "operating system"],
    explanation: "The OS uses hardware efficiently to manage process scheduling across cores."
  },

  // ============================================
  // M2.3 — INTER-PROCESS COMMUNICATION
  // ============================================
  {
    type: "true-false",
    question: "Processes on the same machine require _sockets_ to communicate with each other.",
    correctWord: "no sockets",
    explanation: "Processes on the same machine do NOT need sockets. Sockets are only needed for inter-process communication over a network."
  },
  {
    type: "true-false",
    question: "A pair of communicating processes over a network requires _one socket_.",
    correctWord: "two sockets",
    explanation: "A pair of communicating processes over a network requires two sockets — one at each endpoint."
  },
  {
    type: "fill-blank",
    question: "An endpoint for communication between processes over a network is called a ___.",
    correct: ["socket", "Socket"],
    explanation: "A socket is an endpoint for communication. Network IPC requires two sockets."
  },
  {
    type: "fill-blank",
    question: "Copy and paste between programs is an example of ___.",
    correct: ["inter-process communication", "IPC", "ipc", "Inter-process communication"],
    explanation: "Copy and paste between programs is a classic example of inter-process communication."
  },
  {
    type: "statement-ab",
    statements: [
      "Processes on the same machine need sockets to communicate with each other.",
      "Copy and paste between programs is an example of inter-process communication."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — same-machine IPC needs no sockets. Statement 2 is TRUE — copy/paste is IPC."
  },

  // ============================================
  // M2.3 — VIRTUALIZATION
  // ============================================
  {
    type: "true-false",
    question: "A _multi-boot system_ is a virtualized environment where all OS types run simultaneously.",
    correctWord: "multi-boot system is NOT virtualized",
    explanation: "Multi-boot is NOT virtualized — you choose which OS at boot, and only one runs at a time. Virtualization runs multiple OS simultaneously."
  },
  {
    type: "true-false",
    question: "In virtualization, only _one OS_ can run at a time on a single machine.",
    correctWord: "multiple OS types run concurrently",
    explanation: "Virtualization allows multiple OS types to run concurrently on a single machine. Multi-boot runs only one at a time."
  },
  {
    type: "fill-blank",
    question: "Virtualization allows multiple virtual systems to be hosted on one hardware, implemented via a ___.",
    correct: ["hypervisor", "Hypervisor"],
    explanation: "A hypervisor is the system software that makes virtualization possible."
  },
  {
    type: "fill-blank",
    question: "A major disadvantage of virtualization is that when the ___ breaks, everything breaks.",
    correct: ["hardware", "Hardware"],
    explanation: "When the host hardware breaks, all virtual systems break."
  },
  {
    type: "statement-ab",
    statements: [
      "In virtualization, multiple OS types can run concurrently on a single machine.",
      "A multi-boot system runs multiple operating systems simultaneously."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — virtualization runs multiple OS concurrently. Statement 2 is FALSE — multi-boot only runs one at a time."
  },

  // ============================================
  // M2.3 — HYPERVISORS
  // ============================================
  {
    type: "true-false",
    question: "A Type 1 hypervisor is also known as a _hosted_ hypervisor.",
    correctWord: "baremetal",
    explanation: "Type 1 = baremetal hypervisor (sits directly on hardware). Type 2 = hosted hypervisor (runs on top of existing OS)."
  },
  {
    type: "true-false",
    question: "A Type 2 hypervisor is installed _directly on top of the hardware_.",
    correctWord: "as an application on top of an existing OS",
    explanation: "Type 2 is installed as an application on top of an existing (host) OS. Type 1 sits directly on hardware."
  },
  {
    type: "true-false",
    question: "Type 2 hypervisors are _faster_ than Type 1 because they run on top of an existing OS.",
    correctWord: "slower",
    explanation: "Type 2 is slower — its performance depends on the host OS. Everything below affects everything above."
  },
  {
    type: "fill-blank",
    question: "A Type 1 hypervisor is also known as a ___ hypervisor because it sits directly on hardware.",
    correct: ["baremetal", "bare metal", "bare-metal", "Baremetal"],
    explanation: "Type 1 = baremetal — installed directly on top of hardware."
  },
  {
    type: "fill-blank",
    question: "A Type 2 hypervisor is also known as a ___ hypervisor.",
    correct: ["hosted", "Hosted"],
    explanation: "Type 2 = hosted — acts like an emulator running on top of the host OS."
  },
  {
    type: "fill-blank-inline",
    template: "A Type 1 hypervisor is also called {{blank:baremetal,hosted,embedded}} while a Type 2 hypervisor is also called {{blank:baremetal,hosted,embedded}}.",
    wordBank: ["baremetal", "hosted", "embedded"],
    correct: ["baremetal", "hosted"],
    explanation: "Type 1 = baremetal (on hardware). Type 2 = hosted (on existing OS)."
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
  {
    type: "statement-ab",
    statements: [
      "Type 2 hypervisors are faster than Type 1 because they run on top of an existing OS.",
      "Type 2 hypervisors are slower because their performance depends on the host OS."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE — Type 2 is slower. Statement 2 is TRUE — everything below affects everything above."
  },

  // ============================================
  // M2.3 — RESOURCES NEEDED BY PROCESSES
  // ============================================
  {
    type: "fill-blank",
    question: "Before a process can execute, it must be loaded from secondary storage into ___.",
    correct: ["main memory", "Main memory", "Main Memory", "RAM", "ram"],
    explanation: "Processes are loaded from secondary storage into main memory before execution."
  },
  {
    type: "fill-blank",
    question: "The CPU resource requires ___ due to a limited number of cores.",
    correct: ["scheduling", "Scheduling"],
    explanation: "CPU resources need scheduling because of the limited number of computing cores."
  },
  {
    type: "arrangement",
    question: "Arrange the three resources needed by processes as listed in the lecture:",
    items: ["CPU", "Main memory", "I/O"],
    correct: [0, 1, 2],
    explanation: "CPU (execution, needs scheduling), Main memory (loaded from storage), I/O (user interaction, file access)."
  },

  // ============================================
  // ADDITIONAL CALCULATION QUESTIONS
  // ============================================
  {
    type: "fill-blank",
    question: "A CPU running at 2 GHz executes 1 instruction per cycle. How many instructions per second can it execute? Answer in billions.",
    correct: ["2", "two", "2 billion"],
    explanation: "2 GHz = 2 billion cycles/second × 1 instruction/cycle = 2 billion instructions/second.",
    needsCalculator: true
  },
  {
    type: "fill-blank",
    question: "If a hex-core CPU has 2 threads per core and Process A (3 threads) is in core 6, is time slicing involved? Answer yes or no.",
    correct: ["yes", "Yes", "YES"],
    explanation: "Yes — core 6 can run 2 threads at a time but Process A has 3 threads, so time slicing is needed at the thread level."
  },
  {
    type: "fill-blank",
    question: "Oracle SPARC M8 with 32 cores and 8 threads per core can handle ___ total threads.",
    correct: ["256"],
    explanation: "32 cores × 8 threads/core = 256 total threads.",
    needsCalculator: true
  },

  // ============================================
  // ADDITIONAL CROSS-TOPIC DISTINCTION QUESTIONS
  // ============================================
  {
    type: "true-false",
    question: "The _die_ is mounted on top of the motherboard using LGA or PGA connectors.",
    correctWord: "chip",
    explanation: "The chip is mounted to the motherboard. The die is inside the chip — it is delicate and has connectors."
  },
  {
    type: "true-false",
    question: "Intel _currently manufactures_ chips for Apple.",
    correctWord: "does not manufacture",
    explanation: "Intel does not manufacture for Apple. Apple is fabless and uses TSMC as its foundry."
  },
  {
    type: "true-false",
    question: "Semi-custom APUs in PS5 and Xbox Series X are built _from scratch_ by Sony and Microsoft.",
    correctWord: "based on existing AMD models",
    explanation: "Semi-custom APUs are based on existing AMD models, then tweaked for gaming — not built from scratch."
  },
  {
    type: "true-false",
    question: "Time slicing in the hex-core scenario happens at the _process level_ because there are 6 cores and 2 processes.",
    correctWord: "thread level",
    explanation: "Time slicing happens at the thread level, not process level — because core 6 has 3 threads but can only run 2 at a time."
  },
  {
    type: "fill-blank",
    question: "A ___ GPU is a separate unit outside the main chip that offers higher performance compared to an iGPU.",
    correct: ["discrete", "Discrete"],
    explanation: "Discrete GPU = separate unit, higher performance. iGPU = integrated, for compactness/portability."
  },
  {
    type: "fill-blank",
    question: "The standard layers in a system without a hypervisor are: Applications, ___, and Hardware.",
    correct: ["OS", "Operating System", "operating system"],
    explanation: "Standard layers: Applications → OS → Hardware. A hypervisor adds an additional layer."
  },
  {
    type: "fill-blank",
    question: "How many cores does IBM's Power11 processor have?",
    correct: ["256"],
    explanation: "IBM Power11 (released last year) has 256 cores."
  },
  {
    type: "fill-blank",
    question: "IBM's TrueNorth mimics ___ million human neurons and 256 million synapses.",
    correct: ["1"],
    explanation: "TrueNorth mimics 1 million human neurons and 256 million synapses."
  },
  {
    type: "statement-ab",
    statements: [
      "Most processes are multi-threaded to maximize performance.",
      "Most processes are heavyweight (single-threaded) to be simpler."
    ],
    correct: [2],
    explanation: "Statement 1 is FALSE. Statement 2 is TRUE — most processes are heavyweight to be simpler."
  },
  {
    type: "statement-ab",
    statements: [
      "IPC challenges include synchronization and security.",
      "Copied data in IPC cannot be intercepted by hackers."
    ],
    correct: [1],
    explanation: "Statement 1 is TRUE — sync and security are challenges. Statement 2 is FALSE — data can be intercepted before pasting."
  },
  {
    type: "fill-blank-inline",
    template: "The three CPU manufacturer categories are: {{blank:IDM,fabless,pure play}} (design + manufacture), {{blank:IDM,fabless,pure play}} (design only), and {{blank:IDM,fabless,pure play}} (manufacture only).",
    wordBank: ["IDM", "fabless", "pure play"],
    correct: ["IDM", "fabless", "pure play"],
    explanation: "IDM = design + manufacture (Intel). Fabless = design only (AMD). Pure play = manufacture only (TSMC)."
  },
  {
    type: "fill-blank-inline",
    template: "Intel Xeon is for {{blank:servers,desktops,embedded systems}}, Core is for {{blank:servers,workstations,embedded systems}}, and Atom is for {{blank:servers,workstations,embedded systems}}.",
    wordBank: ["servers", "desktops", "workstations", "embedded systems"],
    correct: ["servers", "workstations", "embedded systems"],
    explanation: "Xeon = servers, Core = workstations/desktops, Atom = embedded systems."
  },
  {
    type: "fill-blank-inline",
    template: "AMD EPYC competes with Intel {{blank:Xeon,Core,Atom}} for servers, while Ryzen Threadripper is for {{blank:gaming,productivity,embedded}} workstations.",
    wordBank: ["Xeon", "Core", "Atom", "gaming", "productivity", "embedded"],
    correct: ["Xeon", "productivity"],
    explanation: "EPYC competes with Xeon for servers. Threadripper is for productivity workstations."
  },
  {
    type: "fill-blank-inline",
    template: "Soldered CPUs are {{blank:easy,not easy}} to upgrade with {{blank:no,possible}} loose parts, while socketed CPUs are {{blank:upgradable,permanent}} with {{blank:no,possible}} loose parts.",
    wordBank: ["easy", "not easy", "no", "possible", "upgradable", "permanent"],
    correct: ["not easy", "no", "upgradable", "possible"],
    explanation: "Soldered: not easy to upgrade, no loose parts. Socketed: upgradable, possible loose parts."
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
