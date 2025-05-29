import React from 'react';

const TerminalText = ({ children }) => {
  return (
    <div className="font-vt323 text-green-400 bg-black p-4">
      <pre>{`
        ██╗  ██╗███████╗███╗   ███╗ ██████╗ ██████╗ ██╗     ███████╗
        ██║  ██║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██║     ██╔════╝
        ███████║█████╗  ██╔████╔██║██║   ██║██████╔╝██║     █████╗  
        ██╔══██║██╔══╝  ██║╚██╔╝██║██║   ██║██╔══██╗██║     ██╔══╝  
        ██║  ██║███████╗██║ ╚═╝ ██║╚██████╔╝██║  ██║███████╗███████╗
        ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
      `}</pre>
      <p className="text-xl">Welcome to the terminal!</p>
      <p>{children}</p>
    </div>
  );
};

export default TerminalText;
