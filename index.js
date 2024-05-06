// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from array of arrays
function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

// Function to record time in for an employee
function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}

// Function to record time out for an employee
function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}

// Function to calculate hours worked by an employee on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned by an employee on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages earned by an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
        return totalWages + wagesEarnedOnDate(employee, timeInEvent.date);
    }, 0);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

// Sample usage:
const employeesData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Employee", 20]
];
const employees = createEmployeeRecords(employeesData);

createTimeInEvent(employees[0], "2024-05-06 0800");
createTimeOutEvent(employees[0], "2024-05-06 1700");

createTimeInEvent(employees[1], "2024-05-06 0900");
createTimeOutEvent(employees[1], "2024-05-06 1800");

console.log(allWagesFor(employees[0])); // Output: 225
console.log(allWagesFor(employees[1])); // Output: 160

console.log(calculatePayroll(employees)); // Output: 385
