const ITCompany = {
    id: 12332129,
    companyName: 'Playtika',
    type: 'product',
    vacancies: [
        {
            frontEnd: {
                salary: 1200
            },
        },
        {
            backEnd: {
                salary: 1500
            },
        },
        {
            scrumMaster: {
                salary: 500
            },
        },
        {
            tester: {
                salary: 600
            },
        }
    ]
};

function checkWorker() {
    const nameWorker = prompt('What is your name?');
    const positionWorker = prompt('Your position?').toLowerCase();
    const salaryWorker = +prompt('Desired Salary?');

    const worker = {};

    worker.greeting = () => {
        document.write(`Hello, my name is ${worker.name}, I'm ${worker.position} in ${worker.companyName}`);
    };

    for (let i = 0; i < ITCompany.vacancies.length; i++) {
        let position = Object.keys(ITCompany.vacancies[i])[0].toLowerCase();
        if (positionWorker === position) {
            const salary = Object.values(ITCompany.vacancies[i])[0].salary;
            if (salaryWorker === salary) {
                worker.name = nameWorker;
                worker.salary = salary;
                worker.position = position;
                worker.companyName = ITCompany.companyName;
                worker.greeting();
                return;
            } else {
                document.write(`${nameWorker}, you have significant skills at ${position} but we hired another developer, let's keep in touch!`);
                return;
            }
        } else if (positionWorker !== position) {
            continue;
        }
    }

    document.write(`Sorry, we don't have any open positions for ${positionWorker} at the moment.`);
}

checkWorker();
