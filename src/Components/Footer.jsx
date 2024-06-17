import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">FantasyPoll</h2>
            <p className="text-sm mt-2">A platform to create and participate in polls with ease. Built using the MERN stack.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Developer: 
            <p className="text-sm mt-2">Dinesh Suthar</p>
            </h2>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/suthardinesh626" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.172c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.775.418-1.305.763-1.605-2.665-.306-5.467-1.333-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.623-5.479 5.921.43.372.824 1.103.824 2.222v3.293c0 .321.218.694.825.577 4.765-1.585 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/dinesh-suthar-01b559159/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19h-3v-10h3v10zm-1.5-11.298c-.966 0-1.75-.788-1.75-1.752 0-.965.784-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .964-.784 1.752-1.75 1.752zm13.25 11.298h-3v-5.357c0-1.279-.025-2.923-1.782-2.923-1.784 0-2.056 1.393-2.056 2.832v5.448h-3v-10h2.881v1.379h.041c.401-.759 1.379-1.559 2.841-1.559 3.04 0 3.603 2.002 3.603 4.604v5.576z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">&copy; {new Date().getFullYear()} FantasyPoll. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
