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
            scramMaster: {
                salary: 500
            },
        },
        {
            tester: {
                salary: 600
            },
        }
    ]
}

const nameWorker = prompt('What is your name?');
const positionWorker = prompt('Your position?').toLowerCase();
const salaryWorker = +prompt('Desired Salary?');

ITCompany.greeting = function () {
    document.write(`Hello, my name is ${this.name}, I'm ${this.position} in ${this.companyName}`);
}

function newWorker() {
    for (let i = 0; i < ITCompany.vacancies.length; i++) {
        const item = ITCompany.vacancies[i];
        const position = Object.keys(item)[0].toLowerCase();
        if (positionWorker === position) {
            const salary = item[position].salary;
            if (salaryWorker === salary) {
                const worker = Object.create(ITCompany);
                worker.name = nameWorker;
                worker.salary = salary;
                worker.position = position;
                worker.companyName = ITCompany.companyName;
                worker.greeting();
                return;
            } else {
                document.write(`${nameWorker}, you has significant skills at ${position} but we hired another developer, let's keep contact !`);
                return;
            }
        }
    }
    document.write(`Sorry, we don't have any open positions for ${positionWorker} at the moment.`);
}

newWorker();
