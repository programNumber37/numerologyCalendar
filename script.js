const now = new Date();

const day = now.getDate();
const month = now.getMonth()+1;
const year = now.getFullYear();






//returns lifepath reduced to 2 digits meaning full LP
function lifePath(date){
    let day1 = date.getDate();
    let month1 = date.getMonth()+1;
    let year1 = date.getFullYear();



    let daySum = fullReduction(day1);
    let monthSum = fullReduction(month1);
    let yearSum = fullReduction(year1);

    let lifePath = daySum+monthSum+yearSum;
    
    return lifePath;
}




function luckyNumber(date){
    const monthNumber = fullReduction(month);
    const yearArray = String(year).split("").map(Number);

    const luckyNumber = appendNumbers(monthNumber,yearArray[3]);

    return luckyNumber;
}

function dayMonth(date){
    return day+month;
}

function monthYear(date){
    return month+fullReduction(year);
}



//full reduction stops at master numbers. Returns number
function fullReduction(number){
    

    const digits = String(number).split("").map(Number);//array of all the numbers
    let sum = 0;
    for(let i=0;i<digits.length;i++){
        sum += digits[i];
    }
    while (hasMultipleDigits(sum) && !isMasterNumber(sum)) {
        sum = reduction(sum); // Assuming `reduction()` sums digits again
    }

    return sum;
}
//reduces a number once!
function reduction(number){
    
    const digits = String(number).split("").map(Number);//array of all the numbers
    let sum = 0;
    for(let i=0;i<digits.length;i++){
        sum += digits[i];
    }
    return sum;

}


const appendNumbers = (num1, num2) => {
    return Number(String(num1) + String(num2));
  };


const isMasterNumber = (number) => (
    number === 11 || number === 22 || number === 33
  );


const hasMultipleDigits = (number) => {
    const numStr = Math.abs(number).toString(); // Remove negative sign and convert to string
    return numStr.length > 1;
  };



  console.log(lifePath(now));
  console.log(fullReduction(lifePath(now)));
  console.log(luckyNumber(now));
  console.log(dayMonth(now));
  console.log(monthYear(now));