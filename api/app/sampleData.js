const Note = require('./models/note.model.js');
let dataList = [
    {title:"Covid-19: Vaccine",category:"GENERAL",content:"Covid-19: Vaccine as good in 'real world' as in trial in Israel"},
    {title:"US snow: Winter storm ",category:"GENERAL",content:"US snow: Winter storm tightens grip in southern states"},  
    {title:"How 'micro-parties' can boost",category:"GENERAL",content:"How 'micro-parties' can boost your mental health. as good in 'real world' as in trial in Israel"},
    {title:"Myanmar coup: Protesters",category:"GENERAL",content:"Myanmar coup: Protesters face up to 20 years in prison under new law"},
    {title:"Premier League: Diop heads",category:"SPORT",content:"Premier League: Diop heads in West Ham's second against Sheff Utd"},
    {title:"Premier League: Diop heads",category:"SPORT",content:"Premier League: Diop heads in West Ham's second against Sheff Utd"},
    {title:"England v India",category:"SPORT",content:"England v India: Spin bowling coach Jeetan Patel defends spinners as India dominate"},
    {title:"Gigi Hadid and Zayn Malik's",category:"ENTERTAITMENT",content:"Gigi Hadid and Zayn Malik's First Valentine's Day as Parents Is Filled With Romance"},
    {title:"How Kourtney Kardashian",category:"ENTERTAITMENT",content:"How Kourtney Kardashian and Travis Barker Celebrated Their First Valentine's Day Together"},
];

exports.sampleDataGenertion = function(){
    Note.count().then(val=>{
        if(val==0){
            dataList.forEach(data=>{
                const note = new Note({
                    title: data.title || "Untitled Note", 
                    content: data.content|| "Untitled Content",
                    category: data.category|| "Untitled Category",
                });
        
                // Save Note in the database
                note.save()
            });
        }
    })
}