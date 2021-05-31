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
    // Sort by descending order
    projects.sort((a, b) => b.order - a.order);

    populateProjects(projects);
}

function skillsHandler(skills) {
    // Sort by descending proficiency
    skills.sort((a, b) => b.proficiency - a.proficiency);

    populateSkills(skills);
}

function errorHandler(err, file) {
    console.error(file + "\n" + err);

    const errorAlert = document.getElementById("errorAlert");
    errorAlert.classList.replace("d-none", "show");
    errorAlert.setAttribute("aria-hidden", "false");
}

function check(response) {
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    }
    else {
        throw Error(response.statusText);
    }
}

function populateExperiences(experiences) {
    const section = document.getElementById("experience-group");

    experiences.forEach((experience, index) => {
        const start = experience.start.month + " " + experience.start.year;
        const end = experience.end.year ? experience.end.month + " " + experience.end.year : "Present";

        const experienceId = "experience-" + index;
        const headingId = "experience-heading-" + index;

        let ariaExpanded = "";
        let collapseClass = "";
        let buttonClass= "";

        if (index == 0) {
            ariaExpanded = "true";
            collapseClass = "show";
            buttonClass = "";
        }
        else {
            ariaExpanded = "false";
            collapseClass = "";
            buttonClass = "collapsed";
        }

        let html = "";
        html += "<div class=\"accordion-item\">";
        html += "<h2 class=\"accordion-header\" id=\"" + headingId + "\">";
        html += "<button class=\"accordion-button " + buttonClass + "\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#" + experienceId + "\" aria-expanded=\"" + ariaExpanded + "\" aria-controls=\"" + experienceId + "\">";
        html += experience.position + " @ " + experience.company;
        html += "</button>";
        html += "</h2>";
        html += "<div id=\"experience-" + index + "\" class=\"accordion-collapse collapse " + collapseClass + "\" aria-labelledby=\"" + headingId + "\">";
        html += "<div class=\"accordion-body\">";
        html += "<p class=\"card-text text-secondary mb-0\">";
        html += experience.company + " - " + experience.department;
        html += "</p>";
        html += "<p class=\"card-text\">";
        html += "<small class=\"text-muted\">" + start + " - " + end + "</small>";
        html += "</p>";
        html += "<p class=\"card-text\">";
        html += experience.description;
        html += "</p>";
        html += "</div>";
        html += "</div>";
        html += "</div>";

        section.innerHTML += html;
    });
}

function populateProjects(projects) {
    const section = document.getElementById("project-cards");

    projects.forEach(project => {
        const status = project.status ? "Complete" : "On-going";
        const color = project.status ? "success" : "primary";

        let stack = "";
        project.stack.forEach(tech => {
            stack += "<span class=\"badge text-dark\">" + tech + "</span>";
        });

        let html = "";
        html += "<div class=\"col\">";
        html += "<div class=\"card\">";
        html += "<div class=\"card-body\">";
        html += "<h5 class=\"card-title\">" + project.name + "</h5>";
        html += "<span class=\"badge bg-" + color + " rounded-pill mb-3\">" + status + "</span>";
        html += "<p class=\"card-text\">" + project.description + "</p>";
        html += "<div>";
        html += "<div class=\"d-flex\" aria-label=\"" + project.name + "\'s tech stack\">";
        html += "<span class=\"bi bi-stack\"></span>";
        html += "<div class=\"d-inline-block\">" + stack + "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class=\"card-footer\">";
        html += "<a class=\"card-link\" href=\"" + project.source + "\" target=\"_blank\"><span style=\"margin-right: 0.5rem !important;\" class=\"bi bi-github\"></span>Source code</a>";
        html += "</div>";
        html += "</div>";
        html += "</div>";

        section.innerHTML += html;
    });
}

function populateSkills(skills) {
    const section = document.getElementById("skills-list");

    skills.forEach(skill => {
        let proficiency = "";
        let color = "";

        if (skill.proficiency >= 2.0) {
            proficiency = "Expert";
            color = "success";
        }
        else if (skill.proficiency >= 1.0) {
            proficiency = "Proficient";
            color = "warning";
        }
        else {
            proficiency = "Beginner";
            color = "primary"
        }

        let html = "";
        html += "<li class=\"list-group-item d-flex flex-fill justify-content-between align-items-center\">";
        html += skill.name;
        html += "<span class=\"badge bg-" + color + " rounded-pill\">" + proficiency + "</span>";
        html += "</li>";

        section.innerHTML += html;
    });
}

function loadData(file, handler) {
    const URL_BASE = "https://maximchiao.me/data/";
    const url = URL_BASE + file;

    fetch(url)
        .then(check)
        .then(handler)
        .catch(err => { errorHandler(err, file) });
}

function init() {
    loadData("experiences.json", experienceHandler);
    loadData("projects.json", projectsHandler);
    loadData("skills.json", skillsHandler);
}

init();