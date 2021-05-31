function experienceHandler(experiences) {
    // Sort by descending start date
    experiences.sort((a, b) => {
        const dateA = new Date(a.start.year, a.start.monthIndex);
        const dateB = new Date(b.start.year, b.start.monthIndex);
        
        return dateB - dateA;
    });
    
    populateExperiences(experiences);
}

function projectsHandler(projects) {
    // Sort by descending weight
    projects.sort((a, b) => b.weight - a.weight);

    populateProjects(projects);
}

function skillsHandler(skills) {
    // Sort by descending proficiency
    skills.sort((a, b) => b.proficiency - a.proficiency);
    
    
    populateSkills(skills);
}

function errorHandler(err) {
    // Do something
}

function check(response) {
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    }
    else {
        throw Error(response.statusText);
    }
}

function loadData(file, handler) {
    const URL_BASE = "http://localhost:5500/data/";
    const url = URL_BASE + file;

    fetch(url)
        .then(check)
        .then(handler)
        .catch(errorHandler);
}

function populateExperiences(experiences) {
    const section = document.getElementById("experiences");

    experiences.forEach(experience => {
        // Do something
    });
}

function populateProjects(projects) {
    const section = document.getElementById("projects");

    projects.forEach(project => {
        // Do something
    });
}

function populateSkills(skills) {
    const section = document.getElementById("skills");

    skills.forEach(skill => {
        // Do something
    });
}

function init() {
    loadData("experiences.json", experienceHandler);
    loadData("projects.json", projectsHandler);
    loadData("skills.json", skillsHandler);
}

init();