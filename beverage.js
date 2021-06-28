const fs = require("fs");

const getRecords = () => {
  const recordedData = fs.readFileSync("sales.json", "utf-8");
  return recordedData.length ? JSON.parse(recordedData) : [];
};

const writeRecords = function (recordToAdd) {
  fs.writeFileSync("sales.json", recordToAdd);
};

const updateRecords = function (newEntry) {
  const feededRecords = getRecords();
  feededRecords.push(newEntry);
  return JSON.stringify(feededRecords);
};

const saveRecord = function (empId, qty, beverage, date) {
  if (
    Number.isInteger(Number(qty)) &&
    Number.isInteger(Number(empId)) &&
    typeof beverage == "string"
  ) {
    const newRecord = { empId, beverage, qty, date };
    writeRecords(updateRecords(newRecord));
    return true;
  } else {
    return false;
  }
};

const queryRecord = function (option, value) {
  let allRecords = getRecords();
  if (option == "--beverage") {
    return allRecords.filter((record) => record.beverage == value);
  }
  if (option == "--empId") {
    return allRecords.filter((record) => record.empId == value);
  }
  if (option == "--date") {
    return allRecords.filter((record) => record.date == value);
  }
  if (option == "--qty") {
    return allRecords.filter((record) => record.qty == value);
  }
  return [];
};

const main = function () {
  const date = new Date();
  const [
    input,
    firstOpt,
    beverage,
    secondOpt,
    qty,
    thirdOpt,
    empId,
    FourthOpt,
    inputDate,
  ] = process.argv.slice(2);

  if (input == "--save") {
    const success = saveRecord(empId, qty, beverage, date);
    console.log(success ? "Record Updated" : "Oops! Invalid Input");
  } else if (input == "--query") {
    console.log(queryRecord(firstOpt, beverage));
  }
};

main();
