function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour:  array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array) {
    let employeeRecord = []
    for (let i = 0; i < array.length; i++){
        employeeRecord.push(createEmployeeRecord(array[i]))
    }
    return employeeRecord
}

function createTimeInEvent(record, date) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10)
    }
    record.timeInEvents.push(timeIn);
    return record;
}

function createTimeOutEvent(record, date) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10)
    }
    record.timeOutEvents.push(timeOut);
    return record;
}

function hoursWorkedOnDate(record, date) {
    const hourInDay = record.timeInEvents.find(record => record.date === date)
    const hourOutDay = record.timeOutEvents.find(record => record.date === date)
    let hourIn = hourInDay.hour
    let hourOut = hourOutDay.hour
    let hoursWorked = (hourOut - hourIn) / 100
    return hoursWorked
}

function wagesEarnedOnDate(record, date) {
    let amountOwed = hoursWorkedOnDate(record, date) * record.payPerHour
    return amountOwed
}

function allWagesFor(record) {
    let wages = record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date))
    return wages.reduce((sum, wage) => sum + wage, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    let employeeFirstName = srcArray.find(name => name.firstName = firstName)
    return employeeFirstName
}

function calculatePayroll(array) {
    let amounts = array.map(record => allWagesFor(record))
    return amounts.reduce((sum, amount) => sum + amount, 0)
    
}