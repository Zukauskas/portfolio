import React, { useEffect, useState } from 'react';
import { Terminal, Code, Briefcase, Mail, User, ChevronRight } from 'lucide-react';
import { fileSystem, loadAllFiles } from '../terminal/fileSystem';
import ReactMarkdown from 'react-markdown';

interface GUIPortfolioProps {
    onSwitchToTerminal: () => void;
}

const GUIPortfolio: React.FC<GUIPortfolioProps> = ({ onSwitchToTerminal }) => {
    const [activeSection, setActiveSection] = useState<string>('about');
    const projects = fileSystem.children?.home.children?.guest.children!.projects.children;
    const [content, setContent] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const loadContent = async () => {
            await loadAllFiles();
            // @ts-ignore
            const aboutContent = fileSystem.children.home.children.guest.children['about.md'].content;
            // @ts-ignore
            const skillsContent = fileSystem.children.home.children.guest.children['skills.md'].content;
            // @ts-ignore
            const contactContent = fileSystem.children.home.children.guest.children['contact.md'].content;
            setContent({
                about: aboutContent,
                skills: skillsContent,
                contacts: contactContent
            });
        };
        loadContent();
    }, []);


    const sections = [
        { id: 'about', icon: User, title: 'About' },
        { id: 'skills', icon: Code, title: 'Skills' },
        { id: 'projects', icon: Briefcase, title: 'Projects' },
        { id: 'contact', icon: Mail, title: 'Contacts' },
    ];

    const isValidProjects = (proj: any): proj is { [key: string]: { content: string } } => {
        return proj !== undefined && typeof proj === 'object' && proj !== null;
    };

    return (
        <div className="bg-gray-900 text-green-400 min-h-screen font-mono flex flex-col">
            <header className="bg-black p-6 border-b border-green-500">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-500 ">Zukauskas.dev <span className="text-purple-500">Portfolio</span></h1>
                    <Terminal className="text-purple-500 cursor-pointer" size={32} onClick={onSwitchToTerminal} />
                </div>
            </header>

            <main className="container mx-auto p-6 flex-grow flex flex-col md:flex-row gap-6">
                <nav className="md:w-1/4">
                    <ul className="space-y-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left p-2 rounded flex items-center ${activeSection === section.id ? 'bg-green-500 text-black' : 'hover:bg-gray-800'
                                        }`}
                                >
                                    <section.icon className="mr-2" size={20} />
                                    {section.title}
                                    {activeSection === section.id && <ChevronRight className="ml-auto" size={20} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <section className="md:w-3/4 bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
                    {activeSection === 'about' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-purple-500">About Me</h2>
                            <ReactMarkdown className="prose prose-invert prose-green max-w-none">
                                {content.about}
                            </ReactMarkdown>
                        </div>
                    )}

                    {activeSection === 'skills' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-purple-500">Skills</h2>
                            <ReactMarkdown className="prose prose-invert prose-green max-w-none">
                                {content.skills}
                            </ReactMarkdown>
                        </div>
                    )}

                    {activeSection === 'projects' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-purple-500">Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {isValidProjects(projects) ? (
                                    Object.entries(projects).map(([key, project]) => (
                                        <div key={key} className="bg-gray-900 p-4 rounded shadow border border-green-500">
                                            <ReactMarkdown className="prose prose-invert prose-green max-w-none">
                                                {project.content}
                                            </ReactMarkdown>
                                        </div>
                                    ))
                                ) : (
                                    <p>No projects available.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeSection === 'contact' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-purple-500">Contact</h2>
                            <ReactMarkdown className="prose prose-invert prose-green max-w-none">
                                {content.contacts}
                            </ReactMarkdown>
                        </div>
                    )}
                </section>
            </main>

            <footer className="bg-black text-green-500 p-4 text-center mt-auto border-t border-green-500">
                <p>&copy; 2024 Tautvydas Z. All rights reserved. <span className="text-purple-500">Hack the planet!</span></p>
            </footer>
        </div>
    );
};

export default GUIPortfolio;