
module.exports = class FilterClass
{
    constructor (name,label_scope,logic)
    {
        logStep("filter constructor")
        this.name        = name
        this.label_scope = label_scope
        this.logic       = logic
        this.save()
        logStepDown("end filter constructor")
    }
    delete() 
    {

    }
    save()
    {

    }
}


