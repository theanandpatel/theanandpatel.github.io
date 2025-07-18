const MILE_CONVERSION = 0.621371; // Kilometers to Miles
const KM_CONVERSION = 1 / MILE_CONVERSION; // Miles to Kilometers

// Make paces a mutable variable
let paces = {
    easy: { km: "5:30-6:00", mi: "8:50-9:40" },
    marathon: { km: "4:02", mi: "6:29" },
    tempo: { km: "3:55-4:00", mi: "6:20-6:25" },
    interval: { km: "3:40-3:50", mi: "5:55-6:10" }
};

// Base training plan with explicit baseKm for each daily workout
// totalKm for each week will be calculated dynamically
const baseTrainingPlan = [
    // Week 1: Jul 21-27
    { week: 1, phase: 'Base Building', dates: 'Jul 21-27', schedule: [
        { day: 'Mon', type: 'Gym / Rest', details: 'Focus on strength training or take a full rest day.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Easy Run', details: 'at an easy, conversational pace.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Intervals', details: '2km WU, 6x400m @ I-Pace w/ 400m jog recovery, 2km CD.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'at an easy pace.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'at a steady, easy pace.', baseKm: 16, descriptionUnit: 'km'}
    ]},
    // Week 2: Jul 28 - Aug 3
    { week: 2, phase: 'Base Building', dates: 'Jul 28 - Aug 3', schedule: [
        { day: 'Mon', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Tempo Run', details: '2km WU, 5km @ T-Pace, 3km CD.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'at a steady, easy pace.', baseKm: 18, descriptionUnit: 'km'}
    ]},
    // Week 3: Aug 4-10
    { week: 3, phase: 'Base Building', dates: 'Aug 4-10', schedule: [
        { day: 'Mon', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Intervals', details: '2km WU, 8x600m @ I-Pace w/ 400m jog recovery, 2km CD.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run + Strides', details: 'easy, finish with 6x100m strides.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'at a steady, easy pace.', baseKm: 21, descriptionUnit: 'km'}
    ]},
    // Week 4: Aug 11-17
    { week: 4, phase: 'Specific Preparation', dates: 'Aug 11-17', schedule: [
        { day: 'Mon', type: 'Gym / Rest', details: 'Focus on strength training or take a full rest day.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '4x1200m @ 5k pace w/ 4min jog recovery.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'easy.', baseKm: 24, descriptionUnit: 'km'}
    ]},
    // Week 5: Aug 18-24
    { week: 5, phase: 'Specific Preparation', dates: 'Aug 18-24', schedule: [
        { day: 'Mon', type: 'Gym / Easy Run', details: 'easy.', baseKm: 7, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '1.6km WU, 4.8km @ LT2 pace, 1.6km CD.', baseKm: 8, descriptionUnit: 'mi'}, // Original: 1mi WU, 3mi @ LT2 pace, 1mi CD.
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 9, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'easy.', baseKm: 26, descriptionUnit: 'km'}
    ]},
    // Week 6 (Holiday): Aug 25-31
    { week: 6, phase: 'Specific Preparation (Holiday)', dates: 'Aug 25-31', schedule: [
        { day: 'Mon', type: 'Strength (Bodyweight)', details: 'Easy run.', baseKm: 5.6, descriptionUnit: 'km'}, // Roughly 3.5 miles
        { day: 'Tue', type: 'Easy Run', details: 'Easy run.', baseKm: 5.6, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Strength (Bodyweight)', details: 'Easy run.', baseKm: 5.6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'Easy run.', baseKm: 5.6, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Strength (Bodyweight)', details: 'Easy run.', baseKm: 5.6, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'Easy / Exploratory run.', baseKm: 14.5, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Rest / Active Recovery', details: 'Focus on maintenance, flexibility, and mental break.', baseKm: 0, descriptionUnit: 'km'}
    ]},
    // Week 7: Sep 1-7
    { week: 7, phase: 'Specific Preparation', dates: 'Sep 1-7', schedule: [
        { day: 'Mon', type: 'Gym / Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '20x1 min fast/1 min jog Fartlek.', baseKm: 12, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 7, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'easy.', baseKm: 32, descriptionUnit: 'km'}
    ]},
    // Week 8: Sep 8-14
    { week: 8, phase: 'Specific Preparation', dates: 'Sep 8-14', schedule: [
        { day: 'Mon', type: 'Gym / Easy Run', details: 'easy.', baseKm: 7, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '6x1km @ LT2 w/ 60s jog recovery.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 9, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'easy.', baseKm: 29, descriptionUnit: 'km'}
    ]},
    // Week 9: Sep 15-21
    { week: 9, phase: 'Specific Preparation', dates: 'Sep 15-21', schedule: [
        { day: 'Mon', type: 'Gym / Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '3x3.2km @ HM pace w/ 5 min jog recovery.', baseKm: 14, descriptionUnit: 'mi'}, // Original: 3x2 mi @ HM pace
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 7, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'easy w/ at MP at end.', baseKm: 35, descriptionUnit: 'km'}
    ]},
    // Week 10: Sep 22-28
    { week: 10, phase: 'Peak Performance', dates: 'Sep 22-28', schedule: [
        { day: 'Mon', type: 'Gym / Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '10km @ LT2 pace (continuous).', baseKm: 14, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Gym / Recovery', details: 'very slow recovery run.', baseKm: 7, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 10, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Gym / Rest', details: 'Final gym session of the week or rest.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Long Run', details: 'with 10-13km @ MP.', baseKm: 32, descriptionUnit: 'km'}
    ]},
    // Week 11: Sep 29 - Oct 5
    { week: 11, phase: 'Taper & Race', dates: 'Sep 29 - Oct 5', schedule: [
        { day: 'Mon', type: 'Strength (Maintenance)', details: 'easy run.', baseKm: 5, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '3x1.6km @ MP w/ 400m jog.', baseKm: 9, descriptionUnit: 'mi'}, // Original: 3x1 mile @ MP
        { day: 'Wed', type: 'Strength (Maintenance)', details: 'easy run.', baseKm: 4, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Strength (Maintenance)', details: 'easy run.', baseKm: 3, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy.', baseKm: 16, descriptionUnit: 'km'},
        { day: 'Sun', type: 'Rest', details: 'Full rest day.', baseKm: 0, descriptionUnit: 'km'}
    ]},
    // Week 12: Oct 6-12 (Race Week)
    { week: 12, phase: 'Taper & Race', dates: 'Oct 6-12', schedule: [
        { day: 'Mon', type: 'Rest', details: 'Full rest day.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Tue', type: 'Workout', details: '4x800m @ 5k pace w/ 400m jog.', baseKm: 7, descriptionUnit: 'km'},
        { day: 'Wed', type: 'Easy Run', details: 'easy.', baseKm: 5, descriptionUnit: 'km'},
        { day: 'Thu', type: 'Easy Run', details: 'easy.', baseKm: 6, descriptionUnit: 'km'},
        { day: 'Fri', type: 'Rest', details: 'Full rest day.', baseKm: 0, descriptionUnit: 'km'},
        { day: 'Sat', type: 'Easy Run', details: 'easy shakeout run.', baseKm: 8, descriptionUnit: 'km'},
        { day: 'Sun', type: 'RACE DAY', details: 'CHICAGO MARATHON! Go for Sub 2:50!', baseKm: 0, descriptionUnit: 'km'}
    ]}
];

// This will hold the currently scaled training plan
let currentTrainingPlan = [];

// Global scaling factor, derived from the slider
let globalScalingFactor = 1; // Default to 1 (2:50 target)

document.addEventListener('DOMContentLoaded', () => {
    const unitToggle = document.getElementById('unitToggle');
    const paceCardsContainer = document.getElementById('pace-cards-container');
    const phaseNav = document.getElementById('phase-nav');
    const weekSelector = document.getElementById('week-selector');
    const dailyPlanContainer = document.getElementById('daily-plan-container');
    const weekTitle = document.getElementById('week-title');
    const chartCanvas = document.getElementById('volumeChart');
    const marathonTimeSlider = document.getElementById('marathonTimeSlider');
    const marathonTimeDisplay = document.getElementById('marathonTimeDisplay');

    let isMiles = false;
    let currentPhase = 'Base Building';
    let volumeChart;

    const phases = [...new Set(baseTrainingPlan.map(w => w.phase))];

    /**
     * Converts total minutes to H:MM:SS format.
     * @param {number} totalMinutes - The total minutes to convert.
     * @returns {string} The formatted time string (e.g., "2:50:00").
     */
    function formatMinutesToHMS(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.round((totalMinutes % 1) * 60);
        return `${hours.toString().padStart(1, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Converts total seconds to MM:SS format.
     * @param {number} totalSeconds - The total seconds to convert.
     * @returns {string} The formatted time string (e.g., "04:02").
     */
    function formatSecondsToMMSS(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Calculates all training paces based on a target marathon time.
     * @param {number} targetMarathonMinutes - The target marathon time in minutes.
     * @returns {object} An object containing marathon, easy, tempo, and interval paces in both km and miles.
     */
    function calculatePaces(targetMarathonMinutes) {
        const totalMarathonSeconds = targetMarathonMinutes * 60;

        const marathonKm = 42.195;
        const marathonMiles = 26.219;

        const mpSecPerKm = totalMarathonSeconds / marathonKm;
        const mpSecPerMile = totalMarathonSeconds / marathonMiles;

        // Define pace differentials in seconds relative to MP
        // These are typical relationships, can be fine-tuned based on runner's profile
        const easyDiffSecKm = 38; // MP + ~38 seconds/km
        const tempoDiffSecKm = -9; // MP - ~9 seconds/km
        const intervalDiffSecKm = -25; // MP - ~25 seconds/km

        const easyDiffSecMile = 60; // MP + ~60 seconds/mile
        const tempoDiffSecMile = -15; // MP - ~15 seconds/mile
        const intervalDiffSecMile = -40; // MP - ~40 seconds/mile

        return {
            marathon: {
                km: formatSecondsToMMSS(mpSecPerKm),
                mi: formatSecondsToMMSS(mpSecPerMile)
            },
            easy: {
                km: formatSecondsToMMSS(mpSecPerKm + easyDiffSecKm),
                mi: formatSecondsToMMSS(mpSecPerMile + easyDiffSecMile)
            },
            tempo: {
                km: formatSecondsToMMSS(mpSecPerKm + tempoDiffSecKm),
                mi: formatSecondsToMMSS(mpSecPerMile + tempoDiffSecMile)
            },
            interval: {
                km: formatSecondsToMMSS(mpSecPerKm + intervalDiffSecKm),
                mi: formatSecondsToMMSS(mpSecPerMile + intervalDiffSecMile)
            }
        };
    }

    /**
     * Parses a date range string (e.g., "Jul 21-27") into start and end Date objects.
     * Assumes the current year for dates without a year specified.
     * @param {string} dateRange - The date range string.
     * @param {number} year - The current year for date parsing.
     * @returns {{startDate: Date, endDate: Date}} An object with start and end Date objects.
     */
    function parseDateRange(dateRange, year) {
        const months = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };

        const parts = dateRange.split(' - ');
        const startParts = parts[0].split(' ');
        const startMonth = months[startParts[0]];
        const startDay = parseInt(startParts[1]);

        let startDate = new Date(year, startMonth, startDay);
        startDate.setHours(0, 0, 0, 0);

        let endDate;
        if (parts.length > 1) {
            const endParts = parts[1].split(' ');
            let endMonth = months[endParts[0]] !== undefined ? months[endParts[0]] : startMonth;
            let endDay = parseInt(endParts[endParts.length - 1]);

            endDate = new Date(year, endMonth, endDay);
            endDate.setHours(0, 0, 0, 0);

            // Handle year rollover if end month is before start month (e.g., Dec-Jan)
            if (startDate.getMonth() > endDate.getMonth()) {
                endDate.setFullYear(year + 1);
            }
        } else {
            endDate = new Date(startDate); // If only one date, end date is same as start date
        }
        return { startDate, endDate };
    }

    /**
     * Determines if a given week is 'past', 'current', or 'future' relative to today.
     * @param {object} weekData - The data object for a specific week.
     * @returns {string} 'past', 'current', or 'future'.
     */
    function getRelativeWeekStatus(weekData) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentYear = today.getFullYear();
        const { startDate, endDate } = parseDateRange(weekData.dates, currentYear);

        if (today.getTime() > endDate.getTime()) {
            return 'past';
        } else if (today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime()) {
            return 'current';
        } else {
            return 'future';
        }
    }

    /**
     * Determines if a specific day within a week is 'past', 'current', or 'future' relative to today.
     * @param {object} weekData - The data object for the current week.
     * @param {number} dayIndex - The index of the day within the week's schedule.
     * @returns {string} 'past', 'current', or 'future'.
     */
    function getRelativeDayStatus(weekData, dayIndex) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentYear = today.getFullYear();
        const { startDate } = parseDateRange(weekData.dates, currentYear);

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const planDayName = weekData.schedule[dayIndex].day;
        const planDayOfWeekIndex = daysOfWeek.indexOf(planDayName); 

        const planDate = new Date(startDate);
        const startDayOfWeekIndex = startDate.getDay();

        let daysToAdd = planDayOfWeekIndex - startDayOfWeekIndex;
        if (daysToAdd < 0) { 
            daysToAdd += 7; // Wrap around to next week if day is earlier in the week than start date's day
        }
        planDate.setDate(startDate.getDate() + daysToAdd);
        planDate.setHours(0, 0, 0, 0); // Normalize to start of day

        if (today.getTime() > planDate.getTime()) {
            return 'past';
        } else if (today.getTime() === planDate.getTime()) {
            return 'current';
        } else {
            return 'future';
        }
    }

    /**
     * Formats the workout details string, converting distances between km and miles as needed.
     * @param {string} originalDetailsText - The original descriptive text for the workout.
     * @param {number} baseKmForDay - The base kilometer distance for the day (used for the leading distance).
     * @param {boolean} isMiles - True if the display unit is miles, false for kilometers.
     * @param {number} scalingFactor - The factor to scale distances based on target marathon time.
     * @param {string} descriptionUnit - The original unit ('km' or 'mi') that numbers within the details text refer to.
     * @returns {string} The formatted and unit-converted details string.
     */
    function formatDayDetails(originalDetailsText, baseKmForDay, isMiles, scalingFactor, descriptionUnit) {
        // If it's a rest/gym day with no running distance, return original text directly
        if (baseKmForDay === 0) {
            return originalDetailsText;
        }

        // Calculate the scaled total distance for the day
        const scaledKm = Math.max(0, baseKmForDay * scalingFactor);
        const scaledMi = scaledKm * MILE_CONVERSION;

        let distancePart = '';
        if (isMiles) {
            distancePart = `${Number.isInteger(scaledMi) ? scaledMi.toFixed(0) : scaledMi.toFixed(1)}mi`;
        } else {
            distancePart = `${Number.isInteger(scaledKm) ? scaledKm.toFixed(0) : scaledKm.toFixed(1)}km`;
        }
        
        // Regex to find numbers (integers or decimals) potentially followed by 'km' or 'mi'
        // 'gi' for global and case-insensitive matching
        const regex = /(\d+\.?\d*)\s*(km|mi)?/gi; 

        // Replace numbers within the original details text based on desired unit
        const processedDetailsText = originalDetailsText.replace(regex, (match, p1, p2) => {
            let value = parseFloat(p1);
            let unitInDescription = p2 ? p2.toLowerCase() : ''; // Get the unit if explicitly present (e.g., 'km', 'mi')

            // Determine the "effective base unit" for the number found in the text.
            // If the text explicitly states 'mi' or 'km', use that.
            // Otherwise, fall back to the 'descriptionUnit' property of the workout,
            // which tells us the intended unit for numbers in this description if not explicit.
            let effectiveBaseUnit = '';
            if (unitInDescription === 'mi') {
                effectiveBaseUnit = 'mi';
            } else if (unitInDescription === 'km') {
                effectiveBaseUnit = 'km';
            } else {
                effectiveBaseUnit = descriptionUnit; 
            }

            let convertedValue;
            let targetUnitSuffix;

            if (effectiveBaseUnit === 'mi') { 
                if (isMiles) { // User wants miles, original description numbers were in miles
                    convertedValue = value;
                    targetUnitSuffix = 'mi';
                } else { // User wants km, original description numbers were in miles, convert to km
                    convertedValue = value * KM_CONVERSION;
                    targetUnitSuffix = 'km';
                }
            } else { // Effective base unit is km (or implicit km)
                if (isMiles) { // User wants miles, original description numbers were in km, convert to miles
                    convertedValue = value * MILE_CONVERSION;
                    targetUnitSuffix = 'mi';
                } else { // User wants km, original description numbers were in km
                    convertedValue = value;
                    targetUnitSuffix = 'km';
                }
            }
            
            // Format the converted value and append the correct unit suffix
            // Ensure consistent decimal places for non-integer distances
            return `${Number.isInteger(convertedValue) ? convertedValue.toFixed(0) : convertedValue.toFixed(1)}${targetUnitSuffix}`;
        });

        // Combine the calculated total distance for the day with the processed descriptive text.
        // The `distancePart` represents the `baseKmForDay` converted and scaled.
        return `${distancePart} ${processedDetailsText}`.trim();
    }


    /**
     * Generates a scaled version of the base training plan based on the target marathon time.
     * @param {number} targetMarathonMinutes - The target marathon time in minutes.
     * @returns {Array<object>} The scaled training plan.
     */
    function getScaledTrainingPlan(targetMarathonMinutes) {
        const baseMarathonMinutes = 170; // This is the base time (2:50:00) for the original plan's mileage
        // Calculate scaling factor: lower target time (faster speed) means higher mileage
        globalScalingFactor = baseMarathonMinutes / targetMarathonMinutes; 

        // Deep copy the base plan to avoid modifying the original `baseTrainingPlan`
        const scaledPlan = JSON.parse(JSON.stringify(baseTrainingPlan)); 

        scaledPlan.forEach(weekData => {
            let weeklyScaledKm = 0;
            weekData.schedule.forEach(dayData => {
                let currentDayBaseKm = dayData.baseKm;
                
                // Only scale if it's a running day (baseKm > 0)
                let newScaledKm = currentDayBaseKm;
                if (currentDayBaseKm > 0) {
                    newScaledKm = Math.max(0, currentDayBaseKm * globalScalingFactor); 
                }
                
                weeklyScaledKm += newScaledKm; // Accumulate scaled kilometers for the week
            });
            weekData.totalKm = weeklyScaledKm; // Store total scaled kilometers for the week
        });
        return scaledPlan;
    }

    /**
     * Renders the pace cards (Easy, Marathon, Tempo, Interval) in the UI.
     * Updates based on the `isMiles` toggle.
     */
    function renderPaceCards() {
        paceCardsContainer.innerHTML = '';
        Object.entries(paces).forEach(([name, values]) => {
            const paceValue = isMiles ? values.mi : values.km;
            const unit = isMiles ? 'min/mi' : 'min/km';
            const card = `
                <div class="pace-card rounded-lg p-4 shadow-sm">
                    <h4 class="font-semibold capitalize text-gray-700">${name} Pace</h4>
                    <p class="text-2xl font-bold text-[#D40026] mt-1">${paceValue}</p>
                    <p class="text-xs text-gray-500">${unit}</p>
                </div>
            `;
            paceCardsContainer.innerHTML += card;
        });
    }

    /**
     * Renders the phase navigation buttons (Base Building, Specific Preparation, Taper & Race).
     * Updates active state based on `currentPhase`.
     */
    function renderPhaseNav() {
        phaseNav.innerHTML = '';
        phases.forEach(phase => {
            const button = document.createElement('button');
            button.textContent = phase;
            button.className = `nav-button px-4 py-2 rounded-lg text-sm font-medium ${phase === currentPhase ? 'active' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`;
            button.addEventListener('click', () => {
                currentPhase = phase;
                renderPhaseNav(); // Re-render nav to update active button
                renderWeekSelector(); // Update week dropdown for new phase
                // Select the first week of the newly selected phase
                const firstWeekOfPhase = currentTrainingPlan.find(w => w.phase === currentPhase).week;
                renderWeekPlan(firstWeekOfPhase);
            });
            phaseNav.appendChild(button);
        });
    }

    /**
     * Renders the week selector dropdown based on the `currentPhase`.
     */
    function renderWeekSelector() {
        weekSelector.innerHTML = '';
        currentTrainingPlan
            .filter(w => w.phase === currentPhase)
            .forEach(weekData => {
                const option = document.createElement('option');
                option.value = weekData.week;
                option.textContent = `Week ${weekData.week} (${weekData.dates})`;
                weekSelector.appendChild(option);
            });
    }

    /**
     * Renders the daily workout plan for the selected week.
     * Applies 'past', 'current', 'future' styling.
     * @param {number} weekNumber - The week number to render.
     */
    function renderWeekPlan(weekNumber) {
        const weekData = currentTrainingPlan.find(w => w.week === parseInt(weekNumber));
        if (!weekData) return;

        weekTitle.textContent = `Week ${weekData.week}: ${weekData.phase}`;
        dailyPlanContainer.innerHTML = '';
        weekData.schedule.forEach((dayData, index) => {
            const tooltipText = dayData.day === 'Sun' && weekData.week === 12 
                ? 'Trust your training. Stick to the plan. You\'ve got this!' 
                : 'Remember to warm up before and cool down after each run.';
            
            const dayStatus = getRelativeDayStatus(weekData, index);
            let cardClasses = "day-card bg-white rounded-lg p-4 border border-[#E0E0E0] shadow-sm flex flex-col";
            if (dayStatus === 'past') {
                cardClasses += ' past-day-card';
            } else if (dayStatus === 'current') {
                cardClasses += ' current-day-card';
            }

            const card = document.createElement('div');
            card.className = cardClasses;
            card.innerHTML = `
                <div class="flex justify-between items-baseline">
                    <h4 class="font-bold text-lg text-[#333333]">${dayData.day}</h4>
                    <div class="tooltip">
                        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">${dayData.type}</span>
                        <span class="tooltiptext">${tooltipText}</span>
                    </div>
                </div>
                <p class="text-[#525252] mt-2 text-sm">${formatDayDetails(dayData.details, dayData.baseKm, isMiles, globalScalingFactor, dayData.descriptionUnit)}</p>
            `;
            dailyPlanContainer.appendChild(card);
        });
        weekSelector.value = weekNumber; // Ensure the dropdown reflects the current week
    }

    /**
     * Renders or updates the Chart.js bar chart for weekly training volume.
     * Updates based on `isMiles` toggle and `currentTrainingPlan` scaling.
     */
    function renderChart() {
        const labels = currentTrainingPlan.map(w => `W${w.week}`);
        const data = currentTrainingPlan.map(w => isMiles ? (w.totalKm * MILE_CONVERSION).toFixed(1) : w.totalKm.toFixed(1));
        const unit = isMiles ? 'Miles' : 'Kilometers';

        const backgroundColors = currentTrainingPlan.map(w => {
            const status = getRelativeWeekStatus(w);
            if (status === 'past') {
                return 'rgba(209, 213, 219, 0.6)'; // Light gray for past
            } else if (status === 'current') {
                return 'rgba(251, 191, 36, 0.8)'; // Yellow for current
            } else {
                return 'rgba(0, 40, 85, 0.6)'; /* Deep Blue with opacity for future */
            }
        });
        const borderColors = currentTrainingPlan.map(w => {
            const status = getRelativeWeekStatus(w);
            if (status === 'past') {
                return 'rgba(156, 163, 175, 1)'; // Darker gray for past border
            } else if (status === 'current') {
                return 'rgba(245, 158, 11, 1)'; // Darker yellow for current border
            } else {
                return 'rgba(0, 40, 85, 1)'; /* Solid Deep Blue for future border */
            }
        });

        const chartData = {
            labels: labels,
            datasets: [{
                label: `Weekly Volume (${unit})`,
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 4,
            }]
        };

        // Destroy existing chart instance before creating a new one to prevent conflicts
        if (volumeChart) {
            volumeChart.destroy();
        }

        volumeChart = new Chart(chartCanvas, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Hide dataset legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` Volume: ${context.parsed.y} ${unit}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: `Total Weekly Volume (${unit})`
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Training Week'
                        }
                    }
                },
                // Click event listener for chart bars to navigate to the corresponding week
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const clickedElementIndex = elements[0].index;
                        const weekNumber = clickedElementIndex + 1; // Weeks are 1-indexed
                        const clickedWeekData = currentTrainingPlan.find(w => w.week === weekNumber);
                        if (clickedWeekData) {
                            currentPhase = clickedWeekData.phase; // Update current phase
                            renderPhaseNav(); // Update phase navigation
                            renderWeekSelector(); // Update week selector
                            renderWeekPlan(weekNumber); // Render the selected week's plan
                        }
                    }
                }
            }
        });
    }

    // Event listener for the unit toggle (KM/MI)
    unitToggle.addEventListener('change', () => {
        isMiles = unitToggle.checked;
        const dot = unitToggle.parentNode.querySelector('.dot');
        if(isMiles) {
            dot.style.transform = 'translateX(16px)'; // Move dot for MI
        } else {
            dot.style.transform = 'translateX(0)'; // Move dot for KM
        }
        renderPaceCards();
        renderChart();
        // Re-render the current week's plan to show updated distances in selected unit
        const currentWeek = parseInt(weekSelector.value);
        renderWeekPlan(currentWeek);
    });

    // Event listener for the marathon time slider
    marathonTimeSlider.addEventListener('input', () => {
        const totalMinutes = parseInt(marathonTimeSlider.value);
        marathonTimeDisplay.textContent = formatMinutesToHMS(totalMinutes);
        
        // Recalculate paces and scale the training plan based on new target time
        paces = calculatePaces(totalMinutes);
        currentTrainingPlan = getScaledTrainingPlan(totalMinutes);

        // Re-render all components that depend on paces or the scaled plan
        renderPaceCards();
        renderChart();
        const currentWeek = parseInt(weekSelector.value);
        renderWeekPlan(currentWeek);
    });

    // Event listener for the week selector dropdown
    weekSelector.addEventListener('change', (e) => {
        renderWeekPlan(e.target.value);
    });

    // Tab functionality for additional guidance sections
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active-tab' from all buttons and hide all content
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            tabContents.forEach(content => content.classList.add('hidden'));

            // Add 'active-tab' to the clicked button and show its content
            button.classList.add('active-tab');
            const targetId = button.id.replace('tab-', 'tab-content-');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });


    /**
     * Initializes the application state and renders initial UI components.
     * Determines the current week based on the actual date.
     */
    function initializeApp() {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to start of day
        let currentWeekNumber = 1;

        // Calculate the initial scaled plan based on the default slider value (2:50:00)
        currentTrainingPlan = getScaledTrainingPlan(parseInt(marathonTimeSlider.value));

        // Determine the current week number based on today's date
        for (const weekData of currentTrainingPlan) {
            const currentYear = today.getFullYear();
            const { startDate, endDate } = parseDateRange(weekData.dates, currentYear);
            if (today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime()) {
                currentWeekNumber = weekData.week;
                break;
            }
            // If today is past the end date of the last week, set current week to the last week
            if (weekData.week === currentTrainingPlan.length && today.getTime() > endDate.getTime()) { 
                currentWeekNumber = currentTrainingPlan.length;
                break;
            }
        }
        
        // Set the initial phase based on the determined current week
        const initialWeekData = currentTrainingPlan.find(w => w.week === currentWeekNumber);
        if (initialWeekData) {
            currentPhase = initialWeekData.phase;
        }

        // Calculate and display initial paces based on default slider value
        paces = calculatePaces(parseInt(marathonTimeSlider.value));
        marathonTimeDisplay.textContent = formatMinutesToHMS(parseInt(marathonTimeSlider.value));

        // Render initial UI components
        renderPaceCards();
        renderPhaseNav();
        renderWeekSelector();
        renderWeekPlan(currentWeekNumber);
        renderChart();

        // Set initial position of the unit toggle dot
        const initialDot = unitToggle.parentNode.querySelector('.dot');
        if (isMiles) {
            initialDot.style.transform = 'translateX(16px)'; // Position for miles
        } else {
            initialDot.style.transform = 'translateX(0)'; // Position for kilometers
        }
    }

    // Initialize the application when the DOM is fully loaded
    initializeApp();
});
