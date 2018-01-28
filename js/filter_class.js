
module.exports.FilterClass = class FilterClass
{
    constructor (name, searchLabel, searchCriteria, action, resultLabel)
    {
        //logStep("filter constructor")
        this.name        = name;
        this.searchLabel = searchLabel;
        this.searchCriteria = searchCriteria;
        this.action = action;
        this.resultLabel = resultLabel;
        this.enabled = true;
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
                <a class="waves-effect waves-light btn green item-toggle">Enabled</a>
                <a class="waves-effect waves-light btn red item-toggle hide">Disabled</a>
            `;
        } else {
            var buttonHTML = `
                <a class="waves-effect waves-light btn green item-toggle hide">Enabled</a>
                <a class="waves-effect waves-light btn red item-toggle">Disabled</a>
            `;
        }
        return `<li id='${this.name}'>
        <div class="collapsible-header"><i class="material-icons">filter_list</i>${this.name}</div>
        <div class="collapsible-body background-white">
          <span>Filter info</span>`+buttonHTML+`
          <div>
            Everything in ${this.searchLabel} that ${this.searchCriteria[0]} has ${this.searchCriteria[1]}, ${this.action} to/from ${this.resultLabel}
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
        filterList.push(new module.exports.FilterClass(name, filters[name]["search1"],filters[name]["search2"],filters[name]["action"],filters[name]["resultLabel"]));
    }
    return filterList;
}

