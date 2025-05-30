import React, { useEffect, useState } from 'react';
import { Terminal, Code, Briefcase, Mail, User, ChevronRight } from 'lucide-react';
import { getFileOrDirectory, loadAllFiles } from '../terminal/fileSystem';
import { FileNode, LocalFile, DirectoryNode } from '../terminal/types';
import ReactMarkdown from 'react-markdown';
import ContentSection from './ContentSection';

interface GUIPortfolioProps {
    onSwitchToTerminal: () => void;
}

const GUIPortfolio: React.FC<GUIPortfolioProps> = ({ onSwitchToTerminal }) => {
    const [activeSection, setActiveSection] = useState<string>('about');
    const [projects, setProjects] = useState<DirectoryNode['children'] | null>(null);
    const [content, setContent] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const loadContent = async () => {
            await loadAllFiles();

            const aboutFileNode = getFileOrDirectory(['home', 'guest', 'about.md']);
            let aboutContent = '';
            if (aboutFileNode && aboutFileNode.type === 'file') {
                aboutContent = (aboutFileNode as FileNode).content;
            }

            const skillsFileNode = getFileOrDirectory(['home', 'guest', 'skills.md']);
            let skillsContent = '';
            if (skillsFileNode && skillsFileNode.type === 'file') {
                skillsContent = (skillsFileNode as FileNode).content;
            }

            const contactFileNode = getFileOrDirectory(['home', 'guest', 'contact.md']);
            let contactContent = '';
            if (contactFileNode && contactFileNode.type === 'file') {
                contactContent = (contactFileNode as FileNode).content;
            }
            
            setContent({
                about: aboutContent,
                skills: skillsContent,
                contacts: contactContent
            });

            const projectsNode = getFileOrDirectory(['home', 'guest', 'projects']);
            if (projectsNode && projectsNode.type === 'directory') {
                setProjects((projectsNode as DirectoryNode).children);
            } else {
                setProjects(null);
            }
        };
        loadContent();
    }, []);


    const sections = [
        { id: 'about', icon: User, title: 'About' },
        { id: 'skills', icon: Code, title: 'Skills' },
        { id: 'projects', icon: Briefcase, title: 'Projects' },
        { id: 'contact', icon: Mail, title: 'Contacts' },
    ];

    // Updated to work with the new projects state which is DirectoryNode['children'] | null
    const isValidProjects = (proj: DirectoryNode['children'] | null): proj is DirectoryNode['children'] => {
        return proj !== null;
    };

    return (
        <div className="bg-black text-green-500 min-h-screen flex flex-col"> {/* Main bg to black, primary text to vibrant green, removed font-mono */}
            <header className="bg-black p-6 border-b border-green-500">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-500 font-vt323">Zukauskas.dev <span className="text-purple-500">Portfolio</span></h1> {/* Applied font-vt323 */}
                    <Terminal className="text-purple-500 cursor-pointer hover:text-green-500 transition-colors" size={32} onClick={onSwitchToTerminal} />
                </div>
            </header>

            <main className="container mx-auto p-6 flex-grow flex flex-col md:flex-row gap-6 font-sans"> {/* Default body text to sans-serif */}
                <nav className="md:w-1/4">
                    <ul className="space-y-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left p-3 rounded flex items-center font-vt323 text-lg transition-all duration-150 ease-in-out ${activeSection === section.id ? 'bg-green-500 text-black shadow-lg scale-105' : 'text-green-500 hover:bg-gray-800 hover:text-green-300'
                                        }`} // Applied font-vt323, adjusted active/hover
                                >
                                    <section.icon className={`mr-3 ${activeSection === section.id ? 'text-black' : 'text-purple-500 group-hover:text-green-300'}`} size={20} />
                                    {section.title}
                                    {activeSection === section.id && <ChevronRight className="ml-auto text-black" size={24} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Content sections: bg-gray-900 for contrast with pure black page bg */}
                <section className="md:w-3/4 bg-gray-900 p-6 rounded-lg shadow-2xl border border-green-500">
                    {activeSection === 'about' && content.about && (
                        <ContentSection title="About Me" markdownContent={content.about} titleClassName="font-vt323 text-purple-500 text-3xl" bodyClassName="font-sans" />
                    )}

                    {activeSection === 'skills' && content.skills && (
                        <ContentSection title="Skills" markdownContent={content.skills} titleClassName="font-vt323 text-purple-500 text-3xl" bodyClassName="font-sans" />
                    )}

                    {activeSection === 'projects' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-purple-500 font-vt323">Projects</h2> {/* Applied font-vt323 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {isValidProjects(projects) ? (
                                    Object.entries(projects).map(([key, projectNode]) => {
                                        if (projectNode.type === 'file') {
                                            return (
                                                // Project cards: bg-gray-800 for a slight lift from section bg
                                                <div key={key} className="bg-gray-800 p-4 rounded-lg shadow-xl border border-green-600 hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                                                    <ReactMarkdown className="prose prose-invert prose-green max-w-none font-sans">
                                                        {(projectNode as FileNode).content}
                                                    </ReactMarkdown>
                                                </div>
                                            );
                                        }
                                        return null; 
                                    })
                                ) : (
                                    <p className="font-sans">No projects available.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeSection === 'contact' && content.contacts && (
                        <ContentSection title="Contact" markdownContent={content.contacts} titleClassName="font-vt323 text-purple-500 text-3xl" bodyClassName="font-sans" />
                    )}
                </section>
            </main>

            <footer className="bg-black text-green-500 p-4 text-center mt-auto border-t border-green-500 font-vt323"> {/* Applied font-vt323 */}
                <p>&copy; 2024 Tautvydas Z. All rights reserved. <span className="text-purple-500">Hack the planet!</span></p>
            </footer>
        </div>
    );
};

export default GUIPortfolio;