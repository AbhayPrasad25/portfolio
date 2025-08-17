"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Terminal as TerminalIcon,
  User,
  Code,
  Mail,
  Wrench,
  HelpCircle,
  Github,
  ExternalLink,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import MatrixRain from "./MatrixRain";
import HackerEffect from "./HackerEffect";
import ParticleField from "./ParticleField";
import { useTypingSound } from "../hooks/useSound";

interface Project {
  name: string;
  tech: string;
  status: string;
  link: string;
}

interface Skill {
  name: string;
  level: number;
}

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

interface Command {
  type:
    | "text"
    | "list"
    | "progress"
    | "contact"
    | "help"
    | "matrix"
    | "hack"
    | "timeline"
    | "ascii"
    | "weather"
    | "theme"
    | "exit";
  content: string | Project[] | Skill[] | ContactInfo | Experience[];
  icon: React.ReactNode;
}

interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

const COMMANDS = {
  about: {
    type: "text",
    content: `👋 Hey there! I'm Abhay Prasad, a passionate Computer Science student specializing in AI/ML
🎓 Currently pursuing Integrated Masters (BTech + MTech) at VIT Bhopal University
🚀 Experienced in building AI-driven projects and audio classification systems
🤖 Artificial Intelligence Intern at Aavaaz Inc with hands-on experience in multilingual chatbots
💡 Love working with Python, PyTorch, and modern web technologies
🌟 Fun fact: I built this entire terminal portfolio in a browser!`,
    icon: <User className="w-4 h-4" />,
  },
  whoami: {
    type: "text",
    content: `root@abhay-portfolio:~$ Abhay Prasad
Location: Varanasi, India
Phone: +91 9517540824
Email: abhayprasad.pro@gmail.com
Occupation: AI/ML Engineering Student
Current Status: Open to internships and opportunities`,
    icon: <User className="w-4 h-4" />,
  },
  experience: {
    type: "timeline",
    content: [
      {
        year: "Dec 2024 - Jan 2025",
        role: "Artificial Intelligence Intern",
        company: "Aavaaz Inc",
        description: "Collaborated on 3 AI-driven projects, optimized data preparation for 3,000+ text corpora, and contributed to multilingual chatbot supporting 5+ languages",
      },
      {
        year: "2021 - 2026",
        role: "Student - Integrated Masters",
        company: "VIT Bhopal University",
        description: "Computer Science with AI/ML Specialization. CGPA: 8.78. Active in Data Science Club leadership and hackathons",
      },
    ],
    icon: <Code className="w-4 h-4" />,
  },
  education: {
    type: "text",
    content: `🎓 Integrated Masters (BTech + MTech) in Computer Science and Engineering
   Specialization: Artificial Intelligence and Machine Learning
🏫 VIT Bhopal University, Bhopal, M.P. (2021 - 2026)
� Cumulative GPA: 8.78/10.0
🏆 XIIth: 89.6% - Sunbeam School, Mughalsarai, U.P. (2019-2020)
📚 Xth: 82.4% - Sunbeam School, Mughalsarai, U.P. (2017-2018)`,
    icon: <Code className="w-4 h-4" />,
  },
  projects: {
    type: "list",
    content: [
      {
        name: "� AcousticNet - Audio Classification System",
        tech: "Python • PyTorch • NumPy • Modal • FastAPI",
        status: "85% Accuracy",
        link: "github.com/abhayraj18",
      },
      {
        name: "📰 TruthSense - Fake News Detection",
        tech: "Python • PyTorch • BERT • Streamlit",
        status: "89% Accuracy",
        link: "github.com/abhayraj18",
      },
      {
        name: "� Interactive Terminal Portfolio",
        tech: "Next.js • TypeScript • Framer Motion",
        status: "Live",
        link: "current-site",
      },
    ],
    icon: <Code className="w-4 h-4" />,
  },
  skills: {
    type: "progress",
    content: [
      { name: "Python", level: 90 },
      { name: "PyTorch/Machine Learning", level: 85 },
      { name: "JavaScript/HTML/CSS", level: 80 },
      { name: "Java", level: 75 },
      { name: "FastAPI/Docker", level: 70 },
    ],
    icon: <Wrench className="w-4 h-4" />,
  },
  contact: {
    type: "contact",
    content: {
      email: "abhayprasad.pro@gmail.com",
      linkedin: "linkedin.com/in/abhay-prasad",
      github: "github.com/abhayraj18",
      website: "abhay-terminal-portfolio.vercel.app",
    },
    icon: <Mail className="w-4 h-4" />,
  },
  help: {
    type: "help",
    content:
      "Available commands: about, whoami, experience, education, projects, skills, contact, achievements, fun, weather, joke, quote, ascii, sound, theme, help, clear, matrix, hackerman, exit",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  achievements: {
    type: "list",
    content: [
      {
        name: "🏆 IIT Kharagpur Data Science Hackathon",
        tech: "Qualified for Round 2 from 2,000+ teams",
        status: "Round 2 Qualifier",
        link: "#",
      },
      {
        name: "🎓 GitHub Foundations Certification",
        tech: "GitHub Official Certification",
        status: "Certified",
        link: "github.com",
      },
      {
        name: "📚 Machine Learning Specialization",
        tech: "Coursera - Andrew Ng Course",
        status: "Completed",
        link: "coursera.org",
      },
      {
        name: "� Data Science Club Leadership",
        tech: "Organized workshops and coding events",
        status: "Active Leader",
        link: "#",
      },
    ],
    icon: <Sparkles className="w-4 h-4" />,
  },
  ascii: {
    type: "ascii",
    content: `
     █████╗ ██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
    ██╔══██╗██╔══██╗██║  ██║██╔══██╗╚██╗ ██╔╝
    ███████║██████╔╝███████║███████║ ╚████╔╝ 
    ██╔══██║██╔══██╗██╔══██║██╔══██║  ╚██╔╝  
    ██║  ██║██████╔╝██║  ██║██║  ██║   ██║   
    ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   `,
    icon: <Code className="w-4 h-4" />,
  },
  weather: {
    type: "weather",
    content: "Varanasi, India: 26°C ☀️ Pleasant\nPerfect weather for coding and learning!",
    icon: <Sparkles className="w-4 h-4" />,
  },
  joke: {
    type: "text",
    content: `Why do programmers prefer dark mode?
Because light attracts bugs! 🐛💡`,
    icon: <Code className="w-4 h-4" />,
  },
  quote: {
    type: "text",
    content: `"The best way to predict the future is to invent it."
- Alan Kay`,
    icon: <Sparkles className="w-4 h-4" />,
  },
  fun: {
    type: "text",
    content: `� When I'm not coding, you can find me:
� Listening to music (all genres, but especially lo-fi)
📚 Reading comic books and graphic novels
🤖 Exploring latest AI/ML research papers
� Following cricket matches and stats
� Playing strategy games and puzzles
☕ Enjoying a good cup of chai while debugging`,
    icon: <User className="w-4 h-4" />,
  },
  sound: {
    type: "text",
    content:
      "Toggle sound effects on/off. Click the 🔊 icon in the header or use this command!",
    icon: <Volume2 className="w-4 h-4" />,
  },
  theme: {
    type: "theme",
    content: "Theme switcher activated! Try: matrix, hackerman, or normal",
    icon: <Sparkles className="w-4 h-4" />,
  },
  exit: {
    type: "exit",
    content: "Thanks for visiting! Redirecting to my website...",
    icon: <ExternalLink className="w-4 h-4" />,
  },
  matrix: {
    type: "matrix",
    content: "Entering the Matrix...",
    icon: <Sparkles className="w-4 h-4" />,
  },
  hackerman: {
    type: "hack",
    content: "Initiating hacker mode...",
    icon: <Code className="w-4 h-4" />,
  },
};

interface HistoryItem {
  type: "input" | "output" | "system";
  content: string;
  command?: string;
  timestamp?: number;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      type: "system",
      content:
        "Welcome to Abhay's interactive terminal portfolio! 🚀\nType `help` to see available commands or try `about` to get started.\nTip: Click the terminal dots for quick actions!",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [hackMode, setHackMode] = useState(false);
  const [particleMode, setParticleMode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playTypingSound, playCommandSound, playErrorSound } =
    useTypingSound();

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderTimeline = (experiences: Experience[]) => (
    <div className="space-y-4">
      {experiences.map((exp, idx) => (
        <motion.div
          key={idx}
          className="border-l-2 border-green-500/50 pl-4 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.2 }}
        >
          <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-2 top-1"></div>
          <div className="text-green-400 font-semibold text-sm">{exp.year}</div>
          <div className="text-white font-bold">{exp.role}</div>
          <div className="text-blue-400">{exp.company}</div>
          <div className="text-gray-400 text-sm mt-1">{exp.description}</div>
        </motion.div>
      ))}
    </div>
  );

  const renderProgressBar = (level: number) => (
    <motion.div
      className="w-full bg-gray-700 rounded-full h-2 overflow-hidden"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </motion.div>
  );

  const renderProjects = (projects: Project[]) => (
    <div className="space-y-3">
      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          className="border border-green-500/30 rounded p-3 bg-black/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 font-semibold">{project.name}</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                project.status === "Live"
                  ? "bg-green-500/20 text-green-400"
                  : project.status === "In Progress"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{project.tech}</p>
        </motion.div>
      ))}
    </div>
  );

  const renderContact = (contact: ContactInfo) => (
    <div className="space-y-2">
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <Mail className="w-4 h-4 text-green-400" />
        <span>Email: {contact.email}</span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <Github className="w-4 h-4 text-green-400" />
        <span>GitHub: {contact.github}</span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <ExternalLink className="w-4 h-4 text-green-400" />
        <span>LinkedIn: {contact.linkedin}</span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <ExternalLink className="w-4 h-4 text-green-400" />
        <span>Website: {contact.website}</span>
      </motion.div>
    </div>
  );

  const handleCommand = useCallback(
    (cmd: string) => {
      const command = cmd.toLowerCase().trim();

      // Play command sound
      if (soundEnabled) {
        playCommandSound();
      }

      setHistory((prev) => [
        ...prev,
        { type: "input", content: `$ ${cmd}`, timestamp: Date.now() },
      ]);
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);

      if (command === "clear") {
        setHistory([]);
        return;
      }

      if (command === "sound") {
        setSoundEnabled(!soundEnabled);
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: `Sound ${!soundEnabled ? "enabled" : "disabled"} 🔊`,
            timestamp: Date.now(),
          },
        ]);
        return;
      }

      if (command === "exit") {
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: "Thanks for visiting my portfolio! 👋\nGoodbye!",
            timestamp: Date.now(),
          },
        ]);
        setTimeout(() => {
          window.open("https://github.com/yourusername", "_blank");
        }, 2000);
        return;
      }

      if (command === "matrix") {
        setMatrixMode(!matrixMode);
        setHackMode(false);
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: matrixMode
              ? "Exiting Matrix mode..."
              : "Entering Matrix mode... 🕶️",
            timestamp: Date.now(),
          },
        ]);
        return;
      }

      if (command === "hackerman" || command === "hack") {
        setHackMode(!hackMode);
        setMatrixMode(false);
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: hackMode
              ? "Exiting hacker mode..."
              : "Welcome to hacker mode! 👨‍💻",
            timestamp: Date.now(),
          },
        ]);
        return;
      }

      if (command === "theme") {
        setMatrixMode(false);
        setHackMode(false);
        setParticleMode(!particleMode);
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: particleMode
              ? "Particle mode disabled!"
              : "Particle mode activated! ✨",
            timestamp: Date.now(),
          },
        ]);
        return;
      }

      setIsTyping(true);

      setTimeout(() => {
        const commandData = COMMANDS[command as keyof typeof COMMANDS];

        if (commandData) {
          setHistory((prev) => [
            ...prev,
            {
              type: "output",
              content: JSON.stringify(commandData),
              command,
              timestamp: Date.now(),
            },
          ]);
        } else {
          // Play error sound for unknown commands
          if (soundEnabled) {
            playErrorSound();
          }

          const suggestions = Object.keys(COMMANDS)
            .filter(
              (cmd) =>
                cmd.includes(command) || command.includes(cmd.slice(0, 3))
            )
            .slice(0, 3);

          const suggestionText =
            suggestions.length > 0
              ? `\n\nDid you mean: ${suggestions.join(", ")}?`
              : '\n\nType "help" to see all available commands.';

          setHistory((prev) => [
            ...prev,
            {
              type: "output",
              content: `Command not found: ${cmd}${suggestionText}`,
              timestamp: Date.now(),
            },
          ]);
        }
        setIsTyping(false);
      }, Math.random() * 1000 + 500);
    },
    [
      matrixMode,
      hackMode,
      particleMode,
      playCommandSound,
      soundEnabled,
      playErrorSound,
    ]
  );

  const renderOutput = (item: HistoryItem) => {
    if (item.type === "input") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400"
        >
          {item.content}
        </motion.div>
      );
    }

    if (item.type === "system") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-400 whitespace-pre-line"
        >
          {item.content}
        </motion.div>
      );
    }

    if (item.type === "output" && item.command) {
      const commandData = COMMANDS[item.command as keyof typeof COMMANDS];

      if (commandData) {
        switch (commandData.type) {
          case "text":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-300 whitespace-pre-line"
              >
                <TypeAnimation
                  sequence={[commandData.content as string]}
                  wrapper="div"
                  speed={80}
                  style={{ whiteSpace: "pre-line" }}
                />
              </motion.div>
            );

          case "list":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {renderProjects(commandData.content as Project[])}
              </motion.div>
            );

          case "progress":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {(commandData.content as Skill[]).map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    {renderProgressBar(skill.level)}
                  </div>
                ))}
              </motion.div>
            );

          case "contact":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {renderContact(commandData.content as ContactInfo)}
              </motion.div>
            );

          case "timeline":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {renderTimeline(commandData.content as Experience[])}
              </motion.div>
            );

          case "ascii":
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 font-mono text-xs whitespace-pre overflow-x-auto"
              >
                {commandData.content as string}
              </motion.div>
            );

          default:
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-300"
              >
                <TypeAnimation
                  sequence={[commandData.content as string]}
                  wrapper="div"
                  speed={80}
                />
              </motion.div>
            );
        }
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 whitespace-pre-line"
      >
        {item.content}
      </motion.div>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Play typing sound for regular keys
    if (soundEnabled && e.key.length === 1) {
      playTypingSound();
    }

    if (e.key === "Enter") {
      handleCommand(input.trim());
      setInput("");
    }

    // Command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }

    // Auto-complete with Tab
    if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const quickCommands = [
    { label: "👋 About Me", command: "about" },
    { label: "💼 Projects", command: "projects" },
    { label: "🛠️ Skills", command: "skills" },
    { label: "📬 Contact", command: "contact" },
    { label: "🎓 Experience", command: "experience" },
    { label: "🏆 Achievements", command: "achievements" },
    { label: "🎮 Fun Facts", command: "fun" },
    { label: "🌟 Matrix Mode", command: "matrix" },
    { label: "💻 Hacker Mode", command: "hackerman" },
    { label: "✨ Particle Mode", command: "theme" },
    { label: "🗑️ Clear Screen", command: "clear" },
  ];

  return (
    <>
      {matrixMode && <MatrixRain />}
      {hackMode && <HackerEffect />}
      {particleMode && <ParticleField active={true} />}

      <div
        className={`relative font-mono rounded-lg shadow-2xl w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col overflow-hidden transition-all duration-500 z-10 ${
          matrixMode
            ? "bg-black border-2 border-green-500 shadow-green-500/50"
            : hackMode
            ? "bg-gray-900 border-2 border-red-500 shadow-red-500/50"
            : particleMode
            ? "bg-gray-900/80 border-2 border-blue-500 shadow-blue-500/50 backdrop-blur-sm"
            : "bg-gray-900 border border-green-500/30"
        }`}
      >
        {/* Terminal Header */}
        <motion.div
          className={`flex items-center gap-2 p-4 border-b relative ${
            matrixMode
              ? "border-green-500 bg-green-500/10"
              : hackMode
              ? "border-red-500 bg-red-500/10"
              : "border-green-500/30 bg-black/50"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-2">
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDropdown(!showDropdown)}
            ></motion.div>
            <motion.div
              className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
            ></motion.div>
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMaximized(!isMaximized)}
            ></motion.div>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-4 mt-2 bg-gray-900 border border-green-500/30 rounded-lg shadow-xl z-50 min-w-48"
              >
                <div className="p-2 space-y-1">
                  <div className="text-xs text-gray-400 px-2 py-1">
                    Quick Commands
                  </div>
                  {quickCommands.map((cmd, idx) => (
                    <motion.button
                      key={idx}
                      className="w-full text-left px-3 py-2 text-sm text-green-400 hover:bg-green-500/20 rounded transition-colors"
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => {
                        handleCommand(cmd.command);
                        setShowDropdown(false);
                      }}
                    >
                      {cmd.label}
                    </motion.button>
                  ))}
                  <hr className="border-green-500/30 my-2" />
                  <motion.button
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => {
                      setHistory([]);
                      setShowDropdown(false);
                    }}
                  >
                    🗑️ Clear All
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 ml-4">
            <TerminalIcon
              className={`w-5 h-5 ${
                matrixMode
                  ? "text-green-400"
                  : hackMode
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            />
            <span
              className={`text-sm font-semibold ${
                matrixMode
                  ? "text-green-400"
                  : hackMode
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {matrixMode
                ? "ABHAY'S MATRIX TERMINAL"
                : hackMode
                ? "ABHAY'S HACKER TERMINAL"
                : "ABHAY'S PORTFOLIO TERMINAL"}
            </span>
          </div>

          {/* Clock and Sound Toggle */}
          <div className="ml-auto flex items-center gap-4">
            {/* Sound Toggle */}
            <motion.button
              className={`text-xs flex items-center gap-1 hover:opacity-70 transition-opacity ${
                matrixMode
                  ? "text-green-400"
                  : hackMode
                  ? "text-red-400"
                  : "text-green-400"
              }`}
              onClick={() => setSoundEnabled(!soundEnabled)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span>{soundEnabled ? "ON" : "OFF"}</span>
            </motion.button>

            <motion.div
              className={`text-xs ${
                matrixMode
                  ? "text-green-400"
                  : hackMode
                  ? "text-red-400"
                  : "text-green-400"
              }`}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {currentTime.toLocaleTimeString()}
            </motion.div>

            {(matrixMode || hackMode) && (
              <motion.div
                className="flex items-center gap-1"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles
                  className={`w-4 h-4 ${
                    matrixMode ? "text-green-400" : "text-red-400"
                  }`}
                />
                <span
                  className={`text-xs ${
                    matrixMode ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {matrixMode ? "MATRIX MODE" : "HACK MODE"}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className={`flex-1 overflow-y-auto p-6 space-y-2 ${
            matrixMode
              ? "terminal-matrix-bg"
              : hackMode
              ? "terminal-hack-bg"
              : "terminal-normal-bg"
          }`}
        >
          <AnimatePresence>
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05 }}
                className="mb-2"
              >
                {renderOutput(item)}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-yellow-400"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"
              />
              <span>Processing...</span>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <motion.div
          className={`flex items-center gap-3 p-4 border-t ${
            matrixMode
              ? "border-green-500 bg-green-500/5"
              : hackMode
              ? "border-red-500 bg-red-500/5"
              : "border-green-500/30 bg-black/30"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span
            className={`${
              matrixMode
                ? "text-green-400"
                : hackMode
                ? "text-red-400"
                : "text-green-400"
            } font-bold text-lg`}
          >
            {matrixMode ? ">>>" : hackMode ? "###" : "$"}
          </span>
          <input
            ref={inputRef}
            className={`bg-transparent outline-none flex-1 font-mono ${
              matrixMode
                ? "text-green-400 placeholder-green-400/50"
                : hackMode
                ? "text-red-400 placeholder-red-400/50"
                : "text-green-400 placeholder-green-400/50"
            }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Type a command and press Enter... (Use ↑↓ for history, Tab for autocomplete)"
          />

          {/* Command suggestions */}
          {input && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              {Object.keys(COMMANDS)
                .filter((cmd) => cmd.startsWith(input.toLowerCase()))
                .slice(0, 3)
                .map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    className={`px-2 py-1 rounded text-xs border transition-colors ${
                      matrixMode
                        ? "border-green-500 text-green-400 bg-green-500/10 hover:bg-green-500/20"
                        : hackMode
                        ? "border-red-500 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                        : "border-green-500 text-green-400 bg-green-500/10 hover:bg-green-500/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </motion.button>
                ))}

              <motion.div
                className={`px-3 py-1 rounded text-xs border ${
                  matrixMode
                    ? "border-green-500 text-green-400 bg-green-500/10"
                    : hackMode
                    ? "border-red-500 text-red-400 bg-red-500/10"
                    : "border-green-500 text-green-400 bg-green-500/10"
                }`}
              >
                Press Enter
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Terminal;
