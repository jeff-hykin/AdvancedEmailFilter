
module.exports.FilterClass = class FilterClass
{
    constructor (name, searchLabel, searchCriteria, action, resultLabel, enabled=true)
    {
        //logStep("filter constructor")
        this.name        = name;
        this.searchLabel = searchLabel;
        this.searchCriteria = searchCriteria;
        this.action = action;
        this.resultLabel = resultLabel;
        this.enabled = enabled;
        this.save()
        console.log(searchCriteria);
        //logStepDown("end filter constructor")
    }
    delete() 
    {

    }
    save()
    {
         
    }
    itemHTML(){
        console.log(this.searchCriteria);
        if(this.enabled){
            var buttonHTML = `
                <a id='${this.name}-enabled' class="waves-effect waves-light btn green item-toggle" onclick='toggleEnable("${this.name}")'>Enabled</a>
                <a id='${this.name}-disabled' class="waves-effect waves-light btn red item-toggle hide" onclick='toggleEnable("${this.name}")'>Disabled</a>
            `;
        } else {
            var buttonHTML = `
                <a id='${this.name}-enabled' class="waves-effect waves-light btn green item-toggle hide" onclick='toggleEnable("${this.name}")'>Enabled</a>
                <a id='${this.name}-disabled' class="waves-effect waves-light btn red item-toggle" onclick='toggleEnable("${this.name}")'>Disabled</a>
            `;
        }
        return `<li id='${this.name}'>
        <div class="collapsible-header"><i class="material-icons">filter_list</i>${this.name}
            <a id='${this.name}-delete' class="waves-effect waves-light btn red item-toggle" onclick='deleteFilter("${this.name}")'>Delete</a>
        </div>
        <div class="collapsible-body background-white">
          <span>Filter info</span>`+buttonHTML+`
          <div>
            Everything in ${this.searchLabel} and ${this.searchCriteria[0]} has ${this.searchCriteria[1]}, then ${this.action} to/from ${this.resultLabel}
          </div>
        </div>
      </li>`
    }
}

module.exports.readFilters = function() {
    var allFilters = remote.getGlobal('data').filters;
    var email = remote.getGlobal('auth').email;
    var filters = allFilters[email];
    var filterList = [];
    for(let name in filters) {
        filterList.push(new module.exports.FilterClass(name, filters[name]["search1"],filters[name]["search2"],filters[name]["action"],filters[name]["resultLabel"],filters[name]["enabled"]));
    }
    return filterList;
}

