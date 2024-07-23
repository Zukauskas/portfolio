import { Directory } from './types';

export const fileSystem: Directory = {
  name: '/',
  type: 'directory',
  content: '',
  children: {
    'home': {
      name: 'home',
      type: 'directory',
      content: '',
      children: {
        'guest': {
          name: 'guest',
          type: 'directory',
          content: '',
          children: {
            'about.txt': { name: 'about.txt', type: 'file', content: 'I am a passionate developer with experience in web technologies.' },
            'skills.txt': { name: 'skills.txt', type: 'file', content: 'JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS' },
            'projects': {
              name: 'projects',
              type: 'directory',
              content: '',
              children: {
                'e-commerce-site.md': { 
                  name: 'e-commerce-site.md', 
                  type: 'file', 
                  content: `# E-commerce Site

## Description
A full-stack e-commerce solution built with React and Node.js.

## Technologies Used
- React
- Node.js
- Express
- MongoDB
- Redux
- Stripe API

## Features
- User authentication
- Product catalog
- Shopping cart
- Secure checkout process
- Order history

## Challenges Overcome
- Implementing real-time inventory updates
- Ensuring secure payment processing
- Optimizing database queries for large product catalogs

## Future Improvements
- Add product reviews and ratings
- Implement a recommendation system
- Develop a mobile app version

[View Project](https://github.com/yourusername/e-commerce-site)`
                },
                'weather-app.md': { 
                  name: 'weather-app.md', 
                  type: 'file', 
                  content: `# Weather App

## Description
A real-time weather application using OpenWeatherMap API.

## Technologies Used
- React
- OpenWeatherMap API
- Axios
- CSS Modules

## Features
- Current weather display
- 5-day forecast
- Location search
- Responsive design

## Challenges Overcome
- Managing API rate limits
- Implementing efficient data caching
- Creating an intuitive user interface

## Future Improvements
- Add weather maps
- Implement geolocation
- Add severe weather alerts

[View Project](https://github.com/yourusername/weather-app)`
                },
                'portfolio.md': { 
                  name: 'portfolio.md', 
                  type: 'file', 
                  content: `# Portfolio

## Description
An interactive terminal-style portfolio (you are here!).

## Technologies Used
- React
- Next.js
- TypeScript
- Tailwind CSS

## Features
- Simulated file system
- Custom command processing
- Markdown rendering
- Responsive design

## Challenges Overcome
- Implementing a virtual file system
- Creating an authentic terminal experience
- Balancing authenticity with user-friendliness

## Future Improvements
- Add more interactive elements
- Implement a simple game or Easter egg
- Create a "GUI" version toggle

[View Project](https://github.com/zukauskas/portfolio)`
                }
              }
            },
            'contact.txt': { name: 'contact.txt', type: 'file', content: 'Email: tautzuk@tutanota.com | GitHub: github.com/zukauskas' },
          }
        }
      }
    }
  }
};

export const getFileOrDirectory = (path: string[]): File | Directory | null => {
  let current: File | Directory = fileSystem;
  for (const segment of path) {
    if (current.type === 'directory' && segment in current.children) {
      current = current.children[segment];
    } else {
      return null;
    }
  }
  return current;
};