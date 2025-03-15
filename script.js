


// CHANGED: Added separate displayed month/year variables
const currentDate = new Date();
const ACTUAL_CURRENT_YEAR = currentDate.getFullYear();
const ACTUAL_CURRENT_MONTH = currentDate.getMonth();
const ACTUAL_CURRENT_DAY = currentDate.getDate();

let displayedYear = ACTUAL_CURRENT_YEAR;
let displayedMonth = ACTUAL_CURRENT_MONTH;

document.getElementById("prev-month").addEventListener("click", () => {
  displayedMonth--;
  if (displayedMonth < 0) {
    displayedMonth = 11;
    displayedYear--;
  }
  renderCalendar(displayedYear, displayedMonth);
});

document.getElementById("next-month").addEventListener("click", () => {
  displayedMonth++;
  if (displayedMonth > 11) {
    displayedMonth = 0;
    displayedYear++;
  }
  renderCalendar(displayedYear, displayedMonth);
});

//returns the amount of days to generate each square for the month, also does start of the week//0=monday 6=sunnday
function getMonthInfo(year,month){
    const firstDay = new Date(year,month,1);
    const lastDay = new Date(year,month+1,0);//last day of the month
    const startDayOfWeek = firstDay.getDay();//0= sunday 6 = saturday
    const totalDays = lastDay.getDate();

    return {startDayOfWeek,totalDays};
}


function generateCalendarDays(year, month) {
  const { startDayOfWeek, totalDays } = getMonthInfo(year, month);
  const { totalDays: totalDaysPrior } = getMonthInfo(year, month - 1);
  const days = [];

  // Previous month days
  const prevMonthStart = (startDayOfWeek === 0) ? 6 : startDayOfWeek - 1;
  for (let i = prevMonthStart; i > 0; i--) {
    days.push({ 
      day: totalDaysPrior - i + 1, 
      isCurrentMonth: false,
      isCurrentDay: false 
    });
  }

  // Current month days - FIXED: Single push per day
  for (let day = 1; day <= totalDays; day++) {
    const isCurrentDay = (
      year === ACTUAL_CURRENT_YEAR &&
      month === ACTUAL_CURRENT_MONTH &&
      day === ACTUAL_CURRENT_DAY
    );
    
    days.push({ 
      day, 
      isCurrentMonth: true,
      isCurrentDay 
    });
  }

  // Next month days
  const nextMonthDays = 42 - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({ 
      day: i, 
      isCurrentMonth: false,
      isCurrentDay: false 
    });
  }

  return days;
}

function monthDisplayCalc(month){
  if(month==0){
    return "January"
  }
  if(month==1){
    return "February"
  }
  if(month==2){
    return "March"
  }
  if(month==3){
    return "April"
  }
  if(month==4){
    return "May"
  }
  if(month==5){
    return "June"
  }
  if(month==6){
    return "July"
  }
  if(month==7){
    return "August"
  }
  if(month==8){
    return "September"
  }
  if(month==9){
    return "October"
  }
  if(month==10){
    return "November"
  }
  if(month==11){
    return "December"
  }
}


function renderCalendar(year, month ) {
  const calendarDays = generateCalendarDays(year, month);
  const calendarGrid = document.getElementById("calendar-grid");
  const monthDisplay = document.getElementById("month-display");

  calendarGrid.innerHTML = ""; // Clear previous content

  calendarDays.forEach(({ day,isCurrentMonth,isCurrentDay }) => {
    const dayElement = document.createElement("div");
    dayElement.className = `calendar-day ${isCurrentDay ? "currentDay" : isCurrentMonth ? "current" : "previous"}`;
    dayElement.textContent = day 

    if (day && isCurrentMonth) {
      dayElement.addEventListener("click", () => handleDayClick(year, month, day));
    }

    if (day && !isCurrentMonth) {
      
      dayElement.addEventListener("click", () => handleDayClick(year, month-1, day));
    }

    calendarGrid.appendChild(dayElement);
    monthDisplay.innerText = monthDisplayCalc(month);
  });
}


function renderDayInfo(date){
  const dayInfoDiv = document.getElementById("dayInfo");
  dayInfoDiv.className = "dayInfoDiv"
  dayInfoDiv.innerHTML = "";

  const fullDate = document.createElement("div");
  fullDate.textContent = 
  String(date.getMonth() + 1).padStart(2, '0')+"/" +
  String(date.getDate()).padStart(2, '0') +"/" +
  date.getFullYear();
  fullDate.className = "fullDate";
  dayInfoDiv.appendChild(fullDate);

  const lifePathInfo = document.createElement("div");
  lifePathInfo.textContent = "LP: " +lifePath(date);
  lifePathInfo.className = "lifePathInfo"
  dayInfoDiv.appendChild(lifePathInfo);

  const lifePathInfoReduced = document.createElement("div");
  lifePathInfoReduced.textContent = "LP full reduced: " +fullReduction(lifePath(date));
  lifePathInfoReduced.className = "lifePathInfoReduced"
  dayInfoDiv.appendChild(lifePathInfoReduced);

  const dayMonthInfo = document.createElement("div");
  dayMonthInfo.textContent = "Day Month: " +dayMonth(date);
  dayMonthInfo.className = "dayMonthInfo"
  dayInfoDiv.appendChild(dayMonthInfo);

  const monthYearInfo = document.createElement("div");
  monthYearInfo.textContent = "Universal Month: " + monthYear(date);
  monthYearInfo.className = "monthYearInfo"
  dayInfoDiv.appendChild(monthYearInfo);

  const luckyNumberInfo = document.createElement("div");
  luckyNumberInfo.textContent = "Lucky Number: " +luckyNumber(date);
  luckyNumberInfo.className = "luckyNumberInfo"
  dayInfoDiv.appendChild(luckyNumberInfo);
}



// Example click handler
function handleDayClick(year, month, day) {

  const clickedDate = new Date(year,month,day);
  renderDayInfo(clickedDate);
  console.log(`Clicked: ${year}-${month + 1}-${day}`);
  console.log("lifePath" +lifePath(clickedDate));
  console.log("lifePath reduced" +fullReduction(lifePath(clickedDate)));
  console.log("luckyNumber" +luckyNumber(clickedDate));
  console.log("dayMonth" +dayMonth(clickedDate));
  console.log("monthYear" +monthYear(clickedDate));
}











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
    const month2 = date.getMonth()+1;
    const year2 = date.getFullYear();
    const monthNumber = fullReduction(month2);
    const yearArray = String(year2).split("").map(Number);

    const luckyNumber = appendNumbers(monthNumber,yearArray[3]);

    return luckyNumber;
}

function dayMonth(date){

    const month1 = date.getMonth()+1;
    const day1 = date.getDate();
    const sum =day1+month1
    
    return sum;
}

function monthYear(date){
    const month = date.getMonth()+1;
    const year = date.getFullYear();

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
//reduces a number once! is obsolete keeping if i need to test something
function reduction(number){
    
    const digits = String(number).split("").map(Number);//array of all the digits
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
    const numStr = Math.abs(number).toString(); 
    return numStr.length > 1;
  };





  
  renderCalendar(displayedYear, displayedMonth);