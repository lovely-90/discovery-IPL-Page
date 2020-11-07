<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 left">
                <form enctype="multipart/form-data" class="upload">
                    <input type="file" @change="onFileChange">
                </form>
                <div>
                    <b-form-group label-cols-sm="4" label-cols-lg="5" label="Team">
                        <b-form-select @change="fillTeam" v-model="selectedTeam" :options="team" class="mt-3"></b-form-select>
                    </b-form-group>
                    <button v-on:click="reset" class="resetBtn">Reset Filters</button>
                </div>
            </div>
            <div class="col-8 right">
                <div class="overflow">
                    <table class="table table-striped table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Teams</th>
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
    name: 'Teams',
    data() {
        return{
            table_data: "",
            data: [],
            dataset: [],
            team: [],
            selectedTeam: null
        }
    }, methods: {
        initalizeNull: function() {
            this.table_data = "";
            this.team = [];
            this.selectedTeam = null;
        },
        modifyData: function() {
            this.data = JSON.parse(JSON.stringify(this.dataset));
        
            this.table_data = "";
            var cnt = 1;
            while(cnt < this.data.length){
                var row_data = this.data[cnt].split(",");
                if(this.selectedTeam !== null && row_data[0] !== this.selectedTeam)
                    this.data.splice(cnt, 1);
                else
                    cnt = cnt+1; 
            }
        },
        formTable: function() {
            for(var count = 1; count < this.data.length;count++){
                var cell_data = this.data[count].split(",");
                this.table_data += '<tr>';
                // Fill Table 
                var obj = {value: cell_data[0].trim(), text: cell_data[0].trim()};
                if(cell_data[0].length > 0){
                    const found = this.team.some(el => el.text === obj.text);
                    if (!found)
                        this.team.push(obj);
                } 
                this.table_data += '<td>' + cell_data[0] + '</td>' + '</tr>';
            }
            this.team.sort((a, b) => {
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
        fillTeam: function() {
            //Delete extra rows
            this.modifyData();

            // Fill table
            this.team = [];
            this.formTable();
        },
        reset: function() {
            this.initalizeNull();
            this.fillTeam();
        }
    }
}
</script>
