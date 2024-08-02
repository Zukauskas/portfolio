const fs = require('fs');
const path = require('path');

const projectsDir = path.join(process.cwd(), 'app', 'projects');
const outputFile = path.join(process.cwd(), 'app', 'projects', 'projectData.json');

function generateProjectData() {
  const projectFiles = fs.readdirSync(projectsDir);
  
  const projectData = {};
  
  projectFiles.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(projectsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      projectData[file] = {
        name: file,
        type: 'file',
        content: content
      };
    }
  });
  
  fs.writeFileSync(outputFile, JSON.stringify(projectData, null, 2));
  console.log('projectData.json has been generated successfully.');
}

generateProjectData();