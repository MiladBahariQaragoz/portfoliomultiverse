// Example data structure for your portfolio projects
// Copy this file to src/data/projects.ts and customize with your actual projects

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  image?: string
  featured: boolean
}

// Data Science & Engineering Projects (Timeline A)
export const dataProjects: Project[] = [
  {
    id: 'ml-pipeline',
    title: 'Real-Time ML Pipeline',
    description: 'Built a scalable machine learning pipeline processing 1M+ events per day with automated retraining',
    technologies: ['Python', 'TensorFlow', 'Apache Kafka', 'Kubernetes', 'FastAPI'],
    link: 'https://example.com/project1',
    github: 'https://github.com/yourusername/ml-pipeline',
    featured: true,
  },
  {
    id: 'data-viz',
    title: 'Interactive Data Visualization Dashboard',
    description: 'Created an interactive dashboard for business analytics with real-time data streaming',
    technologies: ['Python', 'D3.js', 'PostgreSQL', 'Docker'],
    link: 'https://example.com/project2',
    featured: false,
  },
  {
    id: 'nlp-model',
    title: 'NLP Sentiment Analysis',
    description: 'Developed a custom sentiment analysis model achieving 94% accuracy on product reviews',
    technologies: ['PyTorch', 'BERT', 'HuggingFace', 'AWS SageMaker'],
    github: 'https://github.com/yourusername/nlp-sentiment',
    featured: true,
  },
]

// Web Development Projects (Timeline B)
export const webProjects: Project[] = [
  {
    id: 'ecommerce',
    title: 'Modern E-Commerce Platform',
    description: 'Full-stack e-commerce with payment integration, inventory management, and admin dashboard',
    technologies: ['React', 'Next.js', 'Node.js', 'Stripe', 'MongoDB'],
    link: 'https://example.com/shop',
    github: 'https://github.com/yourusername/ecommerce',
    featured: true,
  },
  {
    id: '3d-portfolio',
    title: '3D Interactive Portfolio',
    description: 'This very portfolio! A cinematic multiverse experience built with Three.js',
    technologies: ['React', 'Three.js', 'TypeScript', 'WebGL', 'GSAP'],
    link: 'https://yourportfolio.com',
    github: 'https://github.com/yourusername/portfolio',
    featured: true,
  },
  {
    id: 'social-app',
    title: 'Real-Time Social Platform',
    description: 'Built a social media app with live messaging, notifications, and content feeds',
    technologies: ['React', 'Socket.io', 'Express', 'Redis', 'PostgreSQL'],
    featured: false,
  },
]

// Web3 & Blockchain Projects (Timeline C)
export const web3Projects: Project[] = [
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    description: 'Decentralized marketplace for creating, buying, and selling NFTs with low gas fees',
    technologies: ['Solidity', 'Ethers.js', 'React', 'IPFS', 'Hardhat'],
    link: 'https://example.com/nft-market',
    github: 'https://github.com/yourusername/nft-marketplace',
    featured: true,
  },
  {
    id: 'defi-protocol',
    title: 'DeFi Yield Aggregator',
    description: 'Smart contract protocol that automatically finds the best yield farming opportunities',
    technologies: ['Solidity', 'Web3.js', 'Next.js', 'The Graph', 'Chainlink'],
    github: 'https://github.com/yourusername/defi-yield',
    featured: true,
  },
  {
    id: 'dao-platform',
    title: 'DAO Governance Platform',
    description: 'Voting and proposal system for decentralized autonomous organizations',
    technologies: ['Solidity', 'React', 'Snapshot', 'IPFS', 'Gnosis Safe'],
    link: 'https://example.com/dao',
    featured: false,
  },
]

// Skills grouped by timeline
export const skills = {
  data: [
    'Machine Learning',
    'Deep Learning',
    'NLP & Computer Vision',
    'Data Science',
    'Python',
    'TensorFlow',
    'PyTorch',
    'Apache Spark',
    'SQL & NoSQL',
    'Cloud (AWS, GCP, Azure)',
    'Docker & Kubernetes',
    'FastAPI',
    'Data Visualization',
  ],
  web: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express',
    'GraphQL',
    'Three.js',
    'WebGL',
    'GSAP',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'REST APIs',
  ],
  web3: [
    'Solidity',
    'Smart Contracts',
    'Ethers.js',
    'Web3.js',
    'Hardhat',
    'Truffle',
    'IPFS',
    'The Graph',
    'DeFi Protocols',
    'NFT Standards',
    'DAO Development',
    'Zero-Knowledge Proofs',
    'Layer 2 Solutions',
  ],
}

// Social links
export const socialLinks = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'your.email@example.com',
  website: 'https://yourwebsite.com',
}

// Personal info
export const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer | Data Scientist | Web3 Builder',
  bio: 'I build at the intersection of data, design, and decentralization. From machine learning pipelines to immersive 3D experiences to blockchain protocols.',
  location: 'Your City, Country',
  available: true, // For hire?
  resumeUrl: 'https://example.com/resume.pdf',
}

// Usage example in a timeline component:
/*
import { dataProjects, skills } from '../data/projects'

// In your component:
const featuredProjects = dataProjects.filter(p => p.featured)

featuredProjects.map(project => (
  <ProjectCard
    key={project.id}
    title={project.title}
    description={project.description}
    technologies={project.technologies}
  />
))
*/
