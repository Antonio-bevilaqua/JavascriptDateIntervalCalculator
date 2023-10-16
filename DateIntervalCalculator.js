class DateIntervalCalculator {
    constructor(date1, date2) {
        if (!date1 instanceof Date || !date2 instanceof Date) {
            throw new Error("date1 and date2 must be of type Date");
        }

        var timestamp1 = date1.getTime();
        var timestamp2 = date2.getTime();

        this.initialTime = (timestamp1 > timestamp2) ? timestamp2 : timestamp1;
        this.endingTime = (timestamp1 > timestamp2) ? timestamp1 : timestamp2;
        this.difference = this.endingTime - this.initialTime;
        this.timeConfigs = [
            {
                maxValue: 60,
                divisor: 1000,
            },
            {
                maxValue: 60,
                divisor: 60,
            },
            {
                maxValue: 60,
                divisor: 60,
            },
            {
                maxValue: 24,
                divisor: 24,
            },
            {
                maxValue: 12,
                divisor: 30,
            },
            {
                maxValue: 999999,
                divisor: 12,
            },
        ];
        this.labels = ['seconds', 'minutes', 'hours', 'days', 'months', 'years']
    }


    calculate() {
        this.labels.forEach((label) => {
            this[label] = 0;
        }, this);

        this._calculateDifference(this.difference);
        return this._getDifference();
    }

    _calculateDifference(value, index = 0) {
        this[this.labels[index]] = Math.floor(value / this.timeConfigs[index].divisor);

        if (index > 0) {
            this[this.labels[index - 1]] = this[this.labels[index - 1]] - (this[this.labels[index]] * this.timeConfigs[index].divisor);
        }

        if (this[this.labels[index]] >= this.timeConfigs[index].maxValue) {
            this._calculateDifference(this[this.labels[index]], index + 1);
        }
    }

    _getDifference() {
        let timeDifference = {};
        this.labels.forEach((label) => {
            timeDifference[label] = this[label];
        }, this);
        return timeDifference;
    }
}


var d1 = new Date(2023, 9, 16, 13, 0, 0, 0);
var d2 = new Date(2023, 9, 16, 15, 30, 0, 0);

var d3 = new Date(2023, 9, 16, 13, 59, 0, 0);
var d4 = new Date(2023, 9, 16, 18, 10, 0, 0);

var d5 = new Date(2021, 11, 16, 11, 19, 0, 0);
var d6 = new Date(2023, 9, 16, 20, 20, 0, 0);

var interval = new DateIntervalCalculator(d1, d2);
var interval2 = new DateIntervalCalculator(d3, d4);
var interval3 = new DateIntervalCalculator(d5, d6);

console.log(interval.calculate());
console.log(interval2.calculate());
console.log(interval3.calculate());