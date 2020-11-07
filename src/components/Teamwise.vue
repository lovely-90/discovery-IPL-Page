<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 left">
                <form enctype="multipart/form-data"  class="upload">
                    <input type="file" @change="onFileChange">
                </form>
                <div>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Team">
                        <b-form-select @change="fillTeam" v-model="selectedTeam" :options="team" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Home wins">
                        <b-form-select @change="fillHomeWins" v-model="selectedHomeWins" :options="homeWins" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Away Wins">
                        <b-form-select @change="fillAwayWins" v-model="selectedAwayWins" :options="awayWins" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Home Matches">
                        <b-form-select @change="fillHomeMatches" v-model="selectedHomeMatches" :options="homeMatches" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Away Matches">
                        <b-form-select @change="fillAwayMatches" v-model="selectedAwayMatches" :options="awayMatches" class="mt-3" size="sm"></b-form-select>
                    </b-form-group>
                    <button v-on:click="reset" class="resetBtn">Reset Filters</button>
                </div>
            </div>
            <div class="col-8 right">
                <div class="overflow">
                    <table class="table table-striped table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Team</th>
                                <th scope="col">Home wins</th>
                                <th scope="col">Away wins</th>
                                <th scope="col">Home Matches</th>
                                <th scope="col">Away Matches</th>
                                <th scope="col">Home win percentage</th>
                                <th scope="col">Away win percentage</th>
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
    name: 'Teamwise',
    data() {
        return{
            table_data: "",
            data: [],
            dataset: [],
            team: [],
            homeWins: [],
            awayWins: [],
            homeMatches: [],
            awayMatches: [],
            selectedTeam: null,
            selectedHomeWins: null,
            selectedAwayWins: null,
            selectedHomeMatches: null,
            selectedAwayMatches: null
        }
    }, methods: {
        initalizeNull: function() {
            this.table_data = "", this.team = [], this.homeWins = [], this.awayWins = [],
            this.homeMatches = [], this.awayMatches = [],
            this.selectedTeam = null, this.selectedHomeWins = null,
            this.selectedAwayWins = null, this.selectedHomeMatches = null,
            this.selectedAwayMatches = null
        },
        modifyData: function() {
            this.table_data = "";
            this.data = JSON.parse(JSON.stringify(this.dataset));
            var cnt = 1;
            while(cnt < this.data.length){
                var row_data = this.data[cnt].split(",");
                if(this.selectedTeam !== null && row_data[0] !== this.selectedTeam)
                    this.data.splice(cnt, 1);
                else if(this.selectedHomeWins !== null && row_data[1] !== this.selectedHomeWins)
                    this.data.splice(cnt, 1);
                else if(this.selectedAwayWins !== null && row_data[2] !== this.selectedAwayWins)
                    this.data.splice(cnt, 1);
                else if(this.selectedHomeMatches !== null && row_data[3] !== this.selectedHomeMatches)
                    this.data.splice(cnt, 1);
                else if(this.selectedAwayMatches !== null && row_data[4] !== this.selectedAwayMatches)
                    this.data.splice(cnt, 1);
                else
                    cnt = cnt+1; 
            }

            // Fill table
            this.team = [], this.homeWins = [], this.awayWins = [], this.homeMatches = [], this.awayMatches = [];
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
                        const found = this.team.some(el => el.text === obj.text);
                        if (!found)
                            this.team.push(obj);
                    } else if(cell_count === 1 && cell_data[cell_count].length > 0){
                        const found = this.homeWins.some(el => el.text === obj.text);
                        if (!found)
                            this.homeWins.push(obj);
                    } else if(cell_count === 2 && cell_data[cell_count].length > 0){
                        const found = this.awayWins.some(el => el.text === obj.text);
                        if (!found)
                            this.awayWins.push(obj);
                    } else if(cell_count === 3 && cell_data[cell_count].length > 0){
                        const found = this.homeMatches.some(el => el.text === obj.text);
                        if (!found)
                            this.homeMatches.push(obj);
                    } else if(cell_count === 4 && cell_data[cell_count].length > 0){
                        const found = this.awayMatches.some(el => el.text === obj.text);
                        if (!found)
                            this.awayMatches.push(obj);
                    } 
                    this.table_data += '<td>' + cell_data[cell_count] + '</td>';
                }
                this.table_data += '</tr>';
            }
            this.team.sort((a, b) => {
                return a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
            });
            this.homeWins.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.awayWins.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.homeMatches.sort((a, b) => {
                return parseInt(a.text) < parseInt(b.text) ? -1 : 1;
            });
            this.awayMatches.sort((a, b) => {
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
                this.dataset = x;
                this.data = JSON.parse(JSON.stringify(this.dataset));

                this.formTable(x);
            }
            reader.readAsText(file);
        },
        fillTeam: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillHomeWins: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillAwayWins: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillHomeMatches: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillAwayMatches: function() {
            //Delete extra rows
            this.modifyData();
        },
        reset: function() {
            this.initalizeNull();
            // Fill table
            this.fillTeam();
        }
    }
}
</script>
