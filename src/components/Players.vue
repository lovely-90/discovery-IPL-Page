<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 left">
                <form enctype="multipart/form-data" class="upload">
                    <input type="file" @change="onFileChange">
                </form>
                <div>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Player's Name">
                        <b-form-select @change="fillName" v-model="selectedName" :options="name" class="mt-3"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Date Of Birth">
                        <b-form-select @change="fillDob" v-model="selectedDob" :options="dob" class="mt-3"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Batting Hand">
                        <b-form-select @change="fillBattingHand" v-model="selectedBattingHand" :options="battingHand" class="mt-3"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Bowling Skills">
                        <b-form-select @change="fillBowlingSkill" v-model="selectedBowlingSkills" :options="bowlingSkill" class="mt-3"></b-form-select>
                    </b-form-group>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Country">
                        <b-form-select @change="fillCountry" v-model="selectedCountry" :options="country" class="mt-3"></b-form-select>
                    </b-form-group>
                    <button v-on:click="reset" class="resetBtn">Reset Filters</button>
                </div>
            </div>
            <div class="col-8 right">
                <div class="overflow">
                    <table class="table table-striped table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Bating hand</th>
                                <th scope="col">Bowling Skill</th>
                                <th scope="col">Country</th>
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
    name: 'Players',
    data() {
        return{
            table_data: "",
            data: [],
            dataset: [],
            name: [],
            dob: [],
            battingHand: [],
            bowlingSkill: [],
            country: [],
            selectedName: null,
            selectedDob: null,
            selectedBattingHand: null,
            selectedBowlingSkills: null,
            selectedCountry: null
        }
    }, methods: {
        initalizeNull: function() {
            this.table_data = "", this.name = [], this.dob = [],
            this.battingHand = [], this.bowlingSkill = [], this.country = [],
            this.selectedName = null, this.selectedDob = null,
            this.selectedBattingHand = null,
            this.selectedBowlingSkills = null,
            this.selectedCountry = null
        },
        modifyData: function() {
            this.table_data = "";
            this.data = JSON.parse(JSON.stringify(this.dataset));
            
            var cnt = 1;
            while(cnt < this.data.length){
                var row_data = this.data[cnt].split(",");
                if(this.selectedName !== null && row_data[0] !== this.selectedName)
                    this.data.splice(cnt, 1);
                else if(this.selectedDob !== null && row_data[1] !== this.selectedDob)
                    this.data.splice(cnt, 1);
                else if(this.selectedBattingHand !== null && row_data[2] !== this.selectedBattingHand)
                    this.data.splice(cnt, 1);
                else if(this.selectedBowlingSkills !== null && row_data[3] !== this.selectedBowlingSkills)
                    this.data.splice(cnt, 1);
                else if(this.selectedCountry !== null && row_data[4] !== this.selectedCountry)
                    this.data.splice(cnt, 1);
                else
                    cnt = cnt+1; 
            }
            // Fill table
            this.name = [], this.dob = [], this.battingHand = [], this.bowlingSkill = [], this.country = [];
            this.formTable();
        },
        formTable: function() {
            for(var count = 1; count < this.data.length;count++){
                var cell_data = this.data[count].split(",");
                this.table_data += '<tr>';

                // Fill Table
                for(var cell_count = 0;cell_count < cell_data.length;cell_count++){
                    var obj = {value: cell_data[cell_count].trim(), text: cell_data[cell_count].trim()};
                    if(cell_count === 0 && cell_data[cell_count].length > 0){
                        const found = this.name.some(el => el.text === obj.text);
                        if (!found)
                            this.name.push(obj);
                    } else if(cell_count === 1 && cell_data[cell_count].length > 0){
                        const found = this.dob.some(el => el.text === obj.text);
                        if (!found)
                            this.dob.push(obj);
                    } else if(cell_count === 2 && cell_data[cell_count].length > 0){
                        const found = this.battingHand.some(el => el.text === obj.text);
                        if (!found)
                            this.battingHand.push(obj);
                    } else if(cell_count === 3 && cell_data[cell_count].length > 0){
                        const found = this.bowlingSkill.some(el => el.text === obj.text);
                        if (!found)
                            this.bowlingSkill.push(obj);
                    } else if(cell_count === 4 && cell_data[cell_count].length > 0){
                        const found = this.country.some(el => el.text === obj.text);
                        if (!found)
                            this.country.push(obj);
                    }
                    this.table_data += '<td>' + cell_data[cell_count] + '</td>';
                }
                this.table_data += '</tr>';
            }

            // Sort field values
            this.name.sort((a, b) => {
                return a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
            });
            this.battingHand.sort((a, b) => {
                return a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
            });
            this.bowlingSkill.sort((a, b) => {
                return a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
            });
            this.country.sort((a, b) => {
                return a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
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
        fillName: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillDob: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillBattingHand: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillBowlingSkill: function() {
            //Delete extra rows
            this.modifyData();
        },
        fillCountry: function() {
            //Delete extra rows
            this.modifyData();
        },
        reset: function() {
            this.initalizeNull();
            // Fill table
            this.formTable(this.dataset);
        }
    }
}
</script>

<style>
.container-fluid {
    height: 778px;
}

.row {
    margin-top: 8%;
    background-color: rgb(225,225,225,0.5);
    height: 80%;
}

.upload {
    margin-top: 10%;
    margin-bottom: 16px;
    text-align: right;
}

.left {
    border-right: 5px solid gray;
    padding: 2%;
}

.resetBtn {
    margin-top: 16px;
    margin-left: 4%;
}

.overflow {
    margin-top: 7%;
    max-height: 450px;
    overflow: scroll;
    margin-left: 2%;
    margin-right: 2%;
}

</style>