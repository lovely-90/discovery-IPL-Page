<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 left">
                <form enctype="multipart/form-data"  class="upload">
                    <input type="file" @change="onFileChange">
                </form>
                <div>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Batsman">
                        <b-form-select @change="fillBatsman" v-model="selectedBatsman" :options="batsman" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Total Runs">
                        <b-form-select @change="fillRuns" v-model="selectedRuns" :options="runs" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Out">
                        <b-form-select @change="fillOut" v-model="selectedOut" :options="out" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Number Of Balls">
                        <b-form-select @change="fillBalls" v-model="selectedBalls" :options="balls" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Average">
                        <b-form-select @change="fillAverage" v-model="selectedAverage" :options="average" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Strikerate">
                        <b-form-select @change="fillStrikerate" v-model="selectedStrikerate" :options="strikerate" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <button v-on:click="reset" class="resetBtn">Reset Filters</button>
                </div>
            </div>
            <div class="col-8 right">
                <div class="overflow">
                    <table class="table table-striped table-hover">
                        <thead class="thead-dark">
                            <tr><th scope="col">Batsman</th>
                                <th scope="col">Total Runs</th>
                                <th scope="col">Out</th>
                                <th scope="col">Number Of Balls</th>
                                <th scope="col">Average</th>
                                <th scope="col">Strikerate</th>
                            </tr>
                        </thead>
                        <tbody v-html="table_data"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AvgStrikerate',
    data() {
        return{
            table_data: "",
            data: [],
            dataset: [],
            batsman: [],
            runs: [],
            out: [],
            balls: [],
            average: [],
            strikerate: [],
            selectedBatsman: null,
            selectedRuns: null,
            selectedOut: null,
            selectedBalls: null,
            selectedAverage: null,
            selectedStrikerate: null
        }
    }, methods: {
        initalizeNull: function() {
            this.table_data = "", this.batsman = [], this.runs = [], this.out = [],
            this.balls = [], this.average = [], this.strikerate = [],
            this.selectedBatsman = null, this.selectedRuns = null,
            this.selectedOut = null, this.selectedBalls = null,
            this.selectedAverage = null, this.selectedStrikerate = null
        },
        modifyData: function() {
            this.table_data = "";
            this.data = JSON.parse(JSON.stringify(this.dataset));
            
            var cnt = 1;
            while(cnt < this.data.length){
                var row_data = this.data[cnt].split(",");
                if(this.selectedBatsman !== null && row_data[0] !== this.selectedBatsman)
                    this.data.splice(cnt, 1);
                else if(this.selectedRuns !== null && row_data[1] !== this.selectedRuns)
                    this.data.splice(cnt, 1);
                else if(this.selectedOut !== null && row_data[2] !== this.selectedOut)
                    this.data.splice(cnt, 1);
                else if(this.selectedBalls !== null && row_data[3] !== this.selectedBalls)
                    this.data.splice(cnt, 1);
                else if(this.selectedAverage !== null && row_data[4] !== this.selectedAverage)
                    this.data.splice(cnt, 1);
                else if(this.selectedStrikerate !== null && row_data[5] !== this.selectedStrikerate)
                    this.data.splice(cnt, 1);
                else
                    cnt = cnt+1; 
            }
            // Fill table
            this.batsman = [], this.runs = [], this.out = [], this.balls = [], this.average = [], this.strikerate = [];
            this.formTable();
        },
        formTable: function() {
            for(var count = 1; count < this.data.length;count++){
                var cell_data = this.data[count].split(",");
                this.table_data += '<tr>';

                // Fill variables 
                for(var cell_count = 0;cell_count < cell_data.length;cell_count++){
                    var obj = {value: cell_data[cell_count].trim(), text: cell_data[cell_count].trim()};
                    if(cell_count === 0 && cell_data[cell_count].length > 0){
                        const found = this.batsman.some(el => el.text === obj.text);
                        if (!found)
                            this.batsman.push(obj);
                    } else if(cell_count === 1 && cell_data[cell_count].length > 0){
                        const found = this.runs.some(el => el.text === obj.text);
                        if (!found)
                            this.runs.push(obj);
                    } else if(cell_count === 2 && cell_data[cell_count].length > 0){
                        const found = this.out.some(el => el.text === obj.text);
                        if (!found)
                            this.out.push(obj);
                    } else if(cell_count === 3 && cell_data[cell_count].length > 0){
                        const found = this.balls.some(el => el.text === obj.text);
                        if (!found)
                            this.balls.push(obj);
                    } else if(cell_count === 4 && cell_data[cell_count].length > 0){
                        const found = this.average.some(el => el.text === obj.text);
                        if (!found)
                            this.average.push(obj);
                    } else if(cell_count === 5 && cell_data[cell_count].length > 0){
                        const found = this.strikerate.some(el => el.text === obj.text);
                        if (!found)
                            this.strikerate.push(obj);
                    }
                    this.table_data += '<td>' + cell_data[cell_count] + '</td>';
                }
                this.table_data += '</tr>';
            }
            this.batsman.sort((a, b) => {
                return a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
            });
            this.runs.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.out.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.balls.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.average.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.strikerate.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
                
            this.table_data += '</table>';
        },
        onFileChange: function(e) {
            this.initalizeNull();

            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                var res_data = e.target.result;
                let x = res_data.split(/\r\n|\n/);
                this.data = x;
                this.dataset = JSON.parse(JSON.stringify(this.data));
                this.formTable(x);
            }
            reader.readAsText(file);
        },
        fillBatsman: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillRuns: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillOut: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillBalls: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillAverage: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillStrikerate: function() {
            //Delete extra rows
            this.modifyData();
        },
        reset: function() {
            this.initalizeNull();
            this.fillBatsman();
        }
    }
}
</script>