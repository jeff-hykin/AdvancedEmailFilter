
module.exports = class FilterClass
{
    constructor (name, searchLabel, searchCriteria, action, resultLabel)
    {
        //logStep("filter constructor")
        this.name        = name;
        this.searchLabel = searchLabel;
        this.searchCriteria = searchCriteria;
        this.action = action;
        this.resultLabel = resultLabel;
        this.save()
        //logStepDown("end filter constructor")
    }
    delete() 
    {

    }
    save()
    {

    }
}


