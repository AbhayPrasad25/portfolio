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
  Download,
  Eye,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiGit,
  SiPytorch,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiPlotly,
  SiFastapi,
  SiJupyter,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { MdWork } from "react-icons/md";
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
  level?: number;
  icon?: React.ReactNode;
}

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

interface ResumeInfo {
  downloadUrl: string;
  viewUrl: string;
  lastUpdated: string;
  fileSize: string;
  fileName: string;
  fallbackUrl?: string;
}

interface Education {
  degree: string;
  field: string;
  specialization?: string;
  institution: string;
  location: string;
  duration: string;
  gpa?: string;
  percentage?: string;
  status: string;
}

const COMMANDS = {
  about: {
    type: "about",
    content: `👋 Hey there! I'm Abhay Prasad, a passionate Computer Science student specializing in AI/ML
🎓 Currently pursuing Integrated Masters (BTech + MTech) at VIT Bhopal University
🚀 Experienced in building AI-driven projects and machine learning solutions
🤖 Artificial Intelligence Intern at Aavaaz Inc with hands-on experience in multilingual chatbots
💡 Love solving DSA problems in Java and tackling algorithmic challenges
🌐 Constantly honing my web development skills and building modern applications
💻 Passionate about full stack development, machine learning, and deep learning
🌟 Always exploring the latest in AI research and innovative tech solutions!`,
    icon: <User className="w-4 h-4" />,
  },
  whoami: {
    type: "whoami",
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
        description:
          "Collaborated on 3 AI-driven projects, optimized data preparation for 3,000+ text corpora, and contributed to multilingual chatbot supporting 5+ languages",
      },
    ],
    icon: <Code className="w-4 h-4" />,
  },
  education: {
    type: "education",
    content: `🎓 Integrated Masters (BTech + MTech) in Computer Science and Engineering
   Specialization: Artificial Intelligence and Machine Learning
🏫 VIT Bhopal University, Bhopal, M.P. (2021 - 2026)
� 📊 Cumulative GPA: 8.78/10.0
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
        link: "https://github.com/AbhayPrasad25/AcousticNet",
      },
      {
        name: "📰 TruthSense - Fake News Detection",
        tech: "Python • PyTorch • BERT • Streamlit",
        status: "89% Accuracy",
        link: "https://github.com/AbhayPrasad25/real-time-fake-news-detector",
      },
      {
        name: "� 🛰️ Solar Panel Detection in Satellite Images",
        tech: "Python • Deep Learning • PyTorch • OpenCV • Jupyter",
        status: "90% Accuracy",
        link: "https://github.com/AbhayPrasad25/Solar_panel_detection_in_satellite_images/tree/main",
      },
    ],
    icon: <Code className="w-4 h-4" />,
  },
  skills: {
    type: "skills-categorized",
    content: {
      Programming: [
        { name: "Python", icon: <SiPython className="text-blue-400" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-yellow-400" />,
        },
        { name: "SQL", icon: <SiMysql className="text-blue-500" /> },
        { name: "Java", icon: <FaJava className="text-red-500" /> },
        {
          name: "HTML/CSS",
          icon: (
            <div className="flex gap-1">
              <SiHtml5 className="text-orange-500" />
              <SiCss3 className="text-blue-500" />
            </div>
          ),
        },
        { name: "Git", icon: <SiGit className="text-orange-600" /> },
      ],
      "Libraries and Frameworks": [
        { name: "PyTorch", icon: <SiPytorch className="text-red-500" /> },
        { name: "NumPy", icon: <SiNumpy className="text-blue-400" /> },
        { name: "Pandas", icon: <SiPandas className="text-purple-600" /> },
        {
          name: "Scikit-learn",
          icon: <SiScikitlearn className="text-orange-500" />,
        },
        { name: "Matplotlib", icon: <SiPlotly className="text-blue-600" /> },
        { name: "FastAPI", icon: <SiFastapi className="text-green-500" /> },
      ],
      "Tools and Platforms": [
        { name: "VS Code", icon: <VscCode className="text-blue-500" /> },
        {
          name: "Jupyter Notebooks",
          icon: <SiJupyter className="text-orange-500" />,
        },
        { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
        { name: "GitHub", icon: <SiGithub className="text-gray-300" /> },
        { name: "MS Office", icon: <MdWork className="text-blue-600" /> },
      ],
    },
    icon: <Wrench className="w-4 h-4" />,
  },
  contact: {
    type: "contact-enhanced",
    content: {
      email: "abhayprasad.pro@gmail.com",
      linkedin: "www.linkedin.com/in/abhay-prasad-ai-ml/",
      github: "github.com/AbhayPrasad25",
      website: "abhay-terminal-portfolio.vercel.app",
    },
    icon: <Mail className="w-4 h-4" />,
  },
  // Enhanced Resume Section for Vercel Deployment
  // Deployment Checklist:
  // 1. Ensure PDF file is in public/resume/Abhay_1.pdf
  // 2. File size should be < 5MB for optimal loading
  // 3. Update fallbackUrl with Google Drive backup (optional)
  // 4. Test download/view functionality locally before deployment
  resume: {
    type: "resume",
    content: {
      downloadUrl: "/resume/Abhay_1.pdf",
      viewUrl: "/resume/Abhay_1.pdf",
      lastUpdated: "August 2025",
      fileSize: "245 KB",
      fileName: "Abhay_Prasad_Resume.pdf",
      fallbackUrl:
        "https://drive.google.com/file/d/your-backup-resume-id/view?usp=sharing", // Optional backup
    },
    icon: <FileText className="w-4 h-4" />,
  },
  help: {
    type: "help",
    content:
      "Available commands: about, whoami, experience, education, projects, skills, contact, resume, fun, weather, joke, quote, ascii, sound, theme, help, clear, matrix, hackerman, exit",
    icon: <HelpCircle className="w-4 h-4" />,
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
    content:
      "Varanasi, India: 26°C ☀️ Pleasant\nPerfect weather for coding and learning!",
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
    type: "fun",
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [resumeError, setResumeError] = useState<string | null>(null);
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

  // Enhanced resume functionality
  const trackResumeInteraction = (action: "download" | "view") => {
    // Analytics tracking for Vercel deployment
    if (typeof window !== "undefined") {
      // Google Analytics 4 tracking (if implemented)
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", `resume_${action}`, {
          event_category: "engagement",
          event_label: "resume_interaction",
          value: 1,
        });
      }

      // Custom analytics or console logging
      console.log(`Resume ${action} tracked at ${new Date().toISOString()}`);
    }
  };

  const handleResumeDownload = async (resumeData: ResumeInfo) => {
    setIsDownloading(true);
    setResumeError(null);

    try {
      trackResumeInteraction("download");

      // Check if file exists before downloading
      const response = await fetch(resumeData.downloadUrl, { method: "HEAD" });

      if (!response.ok) {
        throw new Error("Resume file not found");
      }

      // Create download link
      const link = document.createElement("a");
      link.href = resumeData.downloadUrl;
      link.download = resumeData.fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 2000);
    } catch (error) {
      console.error("Download failed:", error);
      setResumeError(
        "Download failed. Please try again or contact me directly."
      );
      setDownloadStatus("error");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResumeView = (resumeData: ResumeInfo) => {
    trackResumeInteraction("view");

    // Try to open the PDF in a new tab
    const newWindow = window.open(
      resumeData.viewUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!newWindow) {
      // Fallback if popup blocked
      setResumeError(
        "Popup blocked. Please allow popups or use the download option."
      );
    }
  };

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

  const renderProjects = (projects: Project[]) => (
    <div className="space-y-3">
      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          className="border border-green-500/30 rounded p-3 bg-black/50 cursor-pointer hover:border-green-400/60 hover:bg-black/70 transition-all duration-300 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => window.open(project.link, "_blank")}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-semibold">
                {project.name}
              </span>
              <ExternalLink className="w-4 h-4 text-green-500/70 group-hover:text-green-400 transition-colors" />
            </div>
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
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
            {project.tech}
          </p>
          <p className="text-green-500/60 text-xs mt-2 group-hover:text-green-400 transition-colors">
            Click to view on GitHub →
          </p>
        </motion.div>
      ))}
    </div>
  );

  const renderContact = (contact: ContactInfo) => (
    <div className="space-y-3">
      <motion.a
        href={`mailto:${contact.email}`}
        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
        whileHover={{ scale: 1.05, x: 4 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Mail className="w-4 h-4" />
        <span className="group-hover:underline">Email: {contact.email}</span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.a>

      <motion.a
        href={`https://${contact.github}`}
        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
        whileHover={{ scale: 1.05, x: 4 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="w-4 h-4" />
        <span className="group-hover:underline">GitHub: {contact.github}</span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.a>

      <motion.a
        href={`https://${contact.linkedin}`}
        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
        whileHover={{ scale: 1.05, x: 4 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink className="w-4 h-4" />
        <span className="group-hover:underline">
          LinkedIn: {contact.linkedin}
        </span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.a>

      <motion.a
        href={`https://${contact.website}`}
        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
        whileHover={{ scale: 1.05, x: 4 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink className="w-4 h-4" />
        <span className="group-hover:underline">
          Website: {contact.website}
        </span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.a>
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

          case "about":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-cyan-500/30 rounded-lg p-4 bg-gradient-to-r from-cyan-900/10 to-blue-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-cyan-400 text-xl font-bold">
                        About Me
                      </h2>
                      <p className="text-gray-400 text-sm">Get to know Abhay</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <TypeAnimation
                      sequence={[
                        "👋 Hey there! I'm Abhay Prasad, a passionate Computer Science student specializing in AI/ML\n\n🎓 Currently pursuing Integrated Masters (BTech + MTech) at VIT Bhopal University\n\n🚀 Experienced in building AI-driven projects and machine learning solutions\n\n🤖 Artificial Intelligence Intern at Aavaaz Inc with hands-on experience in multilingual chatbots\n\n💡 Love solving DSA problems in Java and tackling algorithmic challenges\n\n🌐 Constantly honing my web development skills and building modern applications\n\n💻 Passionate about full stack development, machine learning, and deep learning\n\n🌟 Always exploring the latest in AI research and innovative tech solutions!",
                      ]}
                      wrapper="div"
                      speed={85}
                      style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}
                    />
                  </div>
                </div>
              </motion.div>
            );

          case "whoami":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-green-500/30 rounded-lg p-4 bg-gradient-to-r from-green-900/10 to-emerald-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <span className="text-white font-mono text-sm">$</span>
                    </div>
                    <div>
                      <h2 className="text-green-400 text-lg font-bold">
                        System Information
                      </h2>
                      <p className="text-gray-400 text-xs">whoami output</p>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded p-3 font-mono text-sm">
                    <div className="text-green-400">
                      root@abhay-portfolio:~${" "}
                      <span className="text-cyan-400">whoami</span>
                    </div>
                    <div className="mt-2 space-y-1 text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">
                          User:
                        </span>
                        <span className="text-white">Abhay Prasad</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">
                          Location:
                        </span>
                        <span>📍 Varanasi, India</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">
                          Phone:
                        </span>
                        <span>📞 +91 9517540824</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">
                          Email:
                        </span>
                        <span>✉️ abhayprasad.pro@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">
                          Role:
                        </span>
                        <span>🎓 AI/ML Engineering Student</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">
                          Status:
                        </span>
                        <span className="text-green-400">
                          🟢 Open to internships and opportunities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );

          case "fun":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-purple-500/30 rounded-lg p-4 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-purple-400 text-xl font-bold">
                        Fun Side
                      </h2>
                      <p className="text-gray-400 text-sm">
                        When I&apos;m not coding...
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20"
                    >
                      <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                        🎧 Music Lover
                      </div>
                      <p className="text-gray-300 text-sm">
                        All genres, especially lo-fi beats
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-3 border border-orange-500/20"
                    >
                      <div className="flex items-center gap-2 text-orange-400 font-medium mb-1">
                        📚 Comic Reader
                      </div>
                      <p className="text-gray-300 text-sm">
                        Graphic novels and comics enthusiast
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20"
                    >
                      <div className="flex items-center gap-2 text-green-400 font-medium mb-1">
                        🤖 AI Researcher
                      </div>
                      <p className="text-gray-300 text-sm">
                        Latest AI/ML research papers
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/20"
                    >
                      <div className="flex items-center gap-2 text-yellow-400 font-medium mb-1">
                        🏏 Cricket Fan
                      </div>
                      <p className="text-gray-300 text-sm">
                        Following matches and stats
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-3 border border-indigo-500/20"
                    >
                      <div className="flex items-center gap-2 text-indigo-400 font-medium mb-1">
                        🎮 Gamer
                      </div>
                      <p className="text-gray-300 text-sm">
                        Strategy games and puzzles
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3 border border-amber-500/20"
                    >
                      <div className="flex items-center gap-2 text-amber-400 font-medium mb-1">
                        ☕ Chai Lover
                      </div>
                      <p className="text-gray-300 text-sm">
                        Perfect debugging companion
                      </p>
                    </motion.div>
                  </div>
                </div>
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
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                  >
                    <span className="text-green-400 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-2xl">{skill.icon}</span>
                  </motion.div>
                ))}
              </motion.div>
            );

          case "skills-categorized":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {Object.entries(
                  commandData.content as Record<string, Skill[]>
                ).map(([category, skills], categoryIdx) => (
                  <motion.div
                    key={categoryIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIdx * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="text-yellow-400 font-semibold text-sm border-b border-yellow-400/30 pb-1">
                      💡 {category}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {skills.map((skill, skillIdx) => (
                        <motion.div
                          key={skillIdx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: categoryIdx * 0.1 + skillIdx * 0.05,
                          }}
                          className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                        >
                          <span className="text-green-400 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-2xl">{skill.icon}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );

          case "education":
            // For now, handle as text but with better formatting
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-blue-500/30 rounded-lg p-4 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
                  <div className="space-y-3">
                    <div className="border-b border-blue-400/30 pb-2">
                      <h3 className="text-blue-400 font-semibold text-lg flex items-center gap-2">
                        🎓 Integrated Masters (BTech + MTech)
                      </h3>
                      <p className="text-cyan-300 font-medium">
                        Computer Science and Engineering
                      </p>
                      <p className="text-purple-300 text-sm italic">
                        Specialization: Artificial Intelligence and Machine
                        Learning
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className="text-gray-300">
                          🏫{" "}
                          <span className="text-yellow-300">
                            VIT Bhopal University
                          </span>
                        </p>
                        <p className="text-gray-300">
                          📍 <span className="text-gray-400">Bhopal, M.P.</span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-300">
                          📅 <span className="text-gray-400">2021 - 2026</span>
                        </p>
                        <p className="text-gray-300">
                          📊{" "}
                          <span className="text-green-400 font-medium">
                            GPA: 8.78/10.0
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                      Pursuing
                    </span>
                  </div>
                </div>

                <div className="border border-orange-500/30 rounded-lg p-4 bg-gradient-to-r from-orange-900/10 to-red-900/10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-orange-400 font-semibold flex items-center gap-2">
                        🏆 XIIth Grade - Science Stream
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Completed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className="text-gray-300">
                          🏫{" "}
                          <span className="text-yellow-300">
                            Sunbeam School
                          </span>
                        </p>
                        <p className="text-gray-300">
                          📍{" "}
                          <span className="text-gray-400">
                            Mughalsarai, U.P.
                          </span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-300">
                          📅 <span className="text-gray-400">2019 - 2020</span>
                        </p>
                        <p className="text-gray-300">
                          📈{" "}
                          <span className="text-green-400 font-medium">
                            89.6%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-purple-500/30 rounded-lg p-4 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-400 font-semibold flex items-center gap-2">
                        📚 Xth Grade - Secondary Education
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Completed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <p className="text-gray-300">
                          🏫{" "}
                          <span className="text-yellow-300">
                            Sunbeam School
                          </span>
                        </p>
                        <p className="text-gray-300">
                          �{" "}
                          <span className="text-gray-400">
                            Mughalsarai, U.P.
                          </span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-300">
                          📅 <span className="text-gray-400">2017 - 2018</span>
                        </p>
                        <p className="text-gray-300">
                          📈{" "}
                          <span className="text-green-400 font-medium">
                            82.4%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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

          case "contact-enhanced":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-emerald-500/30 rounded-lg p-4 bg-gradient-to-r from-emerald-900/10 to-teal-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-emerald-400 text-xl font-bold">
                        Get In Touch
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Let&apos;s connect and collaborate!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.a
                      href={`mailto:${
                        (commandData.content as ContactInfo).email
                      }`}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 hover:border-red-400/40 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-red-400 font-medium group-hover:text-red-300 transition-colors">
                          Email
                        </h3>
                        <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors">
                          {(commandData.content as ContactInfo).email}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-red-400/60 group-hover:text-red-400 transition-colors flex-shrink-0" />
                    </motion.a>

                    <motion.a
                      href={`https://${
                        (commandData.content as ContactInfo).github
                      }`}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-500/10 to-slate-500/10 border border-gray-500/20 hover:border-gray-400/40 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-600 to-slate-600 flex items-center justify-center flex-shrink-0">
                        <Github className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-300 font-medium group-hover:text-white transition-colors">
                          GitHub
                        </h3>
                        <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors">
                          {(commandData.content as ContactInfo).github}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400/60 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                    </motion.a>

                    <motion.a
                      href={`https://${
                        (commandData.content as ContactInfo).linkedin
                      }`}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                          LinkedIn
                        </h3>
                        <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors">
                          {(commandData.content as ContactInfo).linkedin}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-blue-400/60 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    </motion.a>
                  </div>

                  <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">
                        Open to opportunities!
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      Always excited to discuss new projects, internships, and
                      collaboration opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>
            );

          case "resume":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-cyan-500/30 rounded-lg p-4 bg-gradient-to-r from-cyan-900/10 to-blue-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-cyan-400 text-xl font-bold">
                        Resume/CV
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Download or view my latest resume
                      </p>
                    </div>
                  </div>

                  {/* Resume Preview Card */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-600/30 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {(commandData.content as ResumeInfo).fileName}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Last updated:{" "}
                            {(commandData.content as ResumeInfo).lastUpdated} •{" "}
                            {(commandData.content as ResumeInfo).fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          Latest
                        </span>
                        {downloadStatus === "success" && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {downloadStatus === "error" && (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>

                    {/* Error Message */}
                    {resumeError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{resumeError}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Enhanced Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <motion.button
                        onClick={() =>
                          handleResumeDownload(
                            commandData.content as ResumeInfo
                          )
                        }
                        disabled={isDownloading}
                        className={`group flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                          isDownloading
                            ? "bg-gray-500/10 border-gray-500/20 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-400/40"
                        }`}
                        whileHover={
                          !isDownloading ? { y: -2, scale: 1.02 } : {}
                        }
                        whileTap={!isDownloading ? { scale: 0.98 } : {}}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                            <span className="font-medium text-gray-400">
                              Downloading...
                            </span>
                          </>
                        ) : downloadStatus === "success" ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="font-medium text-green-400">
                              Downloaded!
                            </span>
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
                            <span className="font-medium text-green-400 group-hover:text-green-300 transition-colors">
                              Download Resume
                            </span>
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        onClick={() =>
                          handleResumeView(commandData.content as ResumeInfo)
                        }
                        className="group flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        <span className="font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                          View Online
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-cyan-400 text-sm">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">Professional Resume</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      Comprehensive overview of my education, experience,
                      skills, and projects in AI/ML domain.
                    </p>
                  </div>
                </div>
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

          case "help":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-cyan-500/30 rounded-lg p-6 bg-gradient-to-r from-cyan-900/10 to-blue-900/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-cyan-400 text-xl font-bold">
                        Available Commands
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Explore all available terminal commands
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Personal Information */}
                    <div className="space-y-3">
                      <h3 className="text-green-400 font-semibold flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Personal Info
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">about</span>
                          <span className="text-gray-500">-</span>
                          <span>Learn about me</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            whoami
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Quick introduction</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            contact
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Get in touch</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            resume
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Download/view resume</span>
                        </div>
                      </div>
                    </div>

                    {/* Professional */}
                    <div className="space-y-3">
                      <h3 className="text-yellow-400 font-semibold flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Professional
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            experience
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Work experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            education
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Educational background</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            projects
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>View my projects</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            skills
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Technical skills</span>
                        </div>
                      </div>
                    </div>

                    {/* Fun & System */}
                    <div className="space-y-3">
                      <h3 className="text-purple-400 font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Fun & System
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">fun</span>
                          <span className="text-gray-500">-</span>
                          <span>Fun facts about me</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">
                            weather
                          </span>
                          <span className="text-gray-500">-</span>
                          <span>Check weather</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">joke</span>
                          <span className="text-gray-500">-</span>
                          <span>Random joke</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 font-mono">quote</span>
                          <span className="text-gray-500">-</span>
                          <span>Inspirational quote</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Commands */}
                  <div className="mt-6 pt-4 border-t border-cyan-500/20">
                    <h3 className="text-orange-400 font-semibold flex items-center gap-2 mb-3">
                      <TerminalIcon className="w-4 h-4" />
                      Special Commands
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">ascii</span>
                        <span className="text-gray-500">-</span>
                        <span>ASCII art</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">matrix</span>
                        <span className="text-gray-500">-</span>
                        <span>Matrix mode</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">
                          hackerman
                        </span>
                        <span className="text-gray-500">-</span>
                        <span>Hacker mode</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">theme</span>
                        <span className="text-gray-500">-</span>
                        <span>Theme options</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">sound</span>
                        <span className="text-gray-500">-</span>
                        <span>Toggle sound</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">clear</span>
                        <span className="text-gray-500">-</span>
                        <span>Clear terminal</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">help</span>
                        <span className="text-gray-500">-</span>
                        <span>Show this help</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-400 font-mono">exit</span>
                        <span className="text-gray-500">-</span>
                        <span>Exit terminal</span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="mt-6 pt-4 border-t border-cyan-500/20">
                    <h3 className="text-pink-400 font-semibold flex items-center gap-2 mb-3">
                      💡 Tips
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>
                        • Use{" "}
                        <span className="text-cyan-400 font-mono">Tab</span> for
                        auto-completion
                      </div>
                      <div>
                        • Use{" "}
                        <span className="text-cyan-400 font-mono">↑ ↓</span>{" "}
                        arrow keys for command history
                      </div>
                      <div>
                        • Click the terminal dots (•••) for quick command access
                      </div>
                      <div>
                        • Try{" "}
                        <span className="text-cyan-400 font-mono">about</span>{" "}
                        to get started!
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );

          case "exit":
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-red-500/30 rounded-lg p-4 bg-gradient-to-r from-red-900/10 to-orange-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-red-400 text-xl font-bold">
                        Goodbye! 👋
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Thank you for exploring my portfolio
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-gray-300">
                      <TypeAnimation
                        sequence={[
                          500,
                          "Thanks for visiting my interactive terminal portfolio! 🚀",
                          1000,
                          "Thanks for visiting my interactive terminal portfolio! 🚀\n\nI hope you enjoyed exploring my projects and learning about my journey in AI/ML.",
                          1500,
                          "Thanks for visiting my interactive terminal portfolio! 🚀\n\nI hope you enjoyed exploring my projects and learning about my journey in AI/ML.\n\nFeel free to reach out if you'd like to collaborate or discuss opportunities!",
                          2000,
                          "Thanks for visiting my interactive terminal portfolio! 🚀\n\nI hope you enjoyed exploring my projects and learning about my journey in AI/ML.\n\nFeel free to reach out if you'd like to collaborate or discuss opportunities!\n\n✨ You can close the terminal",
                        ]}
                        wrapper="div"
                        speed={80}
                        style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}
                        cursor={true}
                        repeat={0}
                        omitDeletionAnimation={true}
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-red-500/20">
                      <motion.a
                        href="mailto:abhayprasad.pro@gmail.com"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-4 h-4" />
                        Email Me
                      </motion.a>

                      <motion.a
                        href="https://github.com/AbhayPrasad25"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </motion.a>

                      <motion.button
                        onClick={() => {
                          // Clear terminal and reset to initial state
                          setHistory([
                            {
                              type: "system",
                              content:
                                "Welcome back to Abhay's interactive terminal portfolio! 🚀\nType `help` to see available commands or try `about` to get started.",
                              timestamp: Date.now(),
                            },
                          ]);
                          setInput("");
                          // Reset all modes
                          setMatrixMode(false);
                          setHackMode(false);
                          setParticleMode(false);
                          setIsMinimized(false);
                          setIsMaximized(false);
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TerminalIcon className="w-4 h-4" />
                        Restart Terminal
                      </motion.button>

                      <motion.button
                        onClick={() => {
                          // Minimize or close the terminal interface
                          setHistory([
                            {
                              type: "system",
                              content:
                                "Terminal closed. Thanks for visiting! 👋",
                              timestamp: Date.now(),
                            },
                          ]);
                          setInput("");
                          // Minimize the terminal to simulate closing
                          setIsMinimized(true);
                          // After a brief delay, you could redirect to homepage or show a different view
                          setTimeout(() => {
                            // Optional: redirect to portfolio homepage or show a "terminal closed" overlay
                            window.close(); // This will only work if the window was opened by script
                          }, 2000);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-400 hover:bg-gray-500/20 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Close Terminal
                      </motion.button>
                    </div>
                  </div>
                </div>
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
    { label: "📄 Resume", command: "resume" },
    { label: "📞 Contact", command: "contact" },
    { label: "🎮 Fun Facts", command: "fun" },
    { label: "🌟 Matrix Mode", command: "matrix" },
    { label: "💻 Hacker Mode", command: "hackerman" },
    { label: "✨ Particle Mode", command: "particle" },
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
                className="absolute top-full left-4 mt-2 bg-gray-900 border border-green-500/30 rounded-lg shadow-xl z-50 min-w-48 max-h-80 overflow-y-auto"
              >
                <div className="p-2 space-y-1">
                  <div className="text-xs text-gray-400 px-2 py-1">
                    Quick Commands
                  </div>
                  {quickCommands.map((cmd, idx) => (
                    <motion.button
                      key={idx}
                      className="w-full text-left px-3 py-2 text-sm text-green-400 hover:bg-green-500/20 hover:text-green-300 rounded transition-all duration-200"
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
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded transition-all duration-200"
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
