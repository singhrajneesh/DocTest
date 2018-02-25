/* required libraries */
var textract = require("textract");
var Wordpos = require("wordpos");
var natural = require("natural");
var fs = require("fs");
wordpos = new Wordpos();
var base,doc,spellmiss=0,wordcount,adj,Noun;
	textract.fromFileWithPath("html_base.odt", function( error, text ) {
		var tokenizer = new natural.WordTokenizer();
        base=tokenizer.tokenize(text);
        //console.log(base);
	        textract.fromFileWithPath("HTML_CSS.docx", function( error, text ) {
				var tokenizer = new natural.WordTokenizer();
		        doc=tokenizer.tokenize(text);
		        //console.log(doc);
		        
		        wordcount=doc.length;
		        console.log("The no. of words are  "+wordcount);

		        for(var i=0; i<base.length; i++)
		        {for(var j=0; j<doc.length; j++)
		        	{
		        		if(base[i]==doc[j])
		        			{spellmiss=spellmiss+1;
		        				break;}
		        	}
		        }

		        spellmiss=base.length-spellmiss;
		        console.log("The number of tags missing  "+spellmiss);

		        wordpos.getAdjectives(text, function(result){
		        	adj=result.length;
			            wordpos.getNouns(text, function(result){
			        	Noun=result.length;
			        
			            var ob ={
			        	object: {
			        		'wordCount' : "The no. of words are: " + wordcount,
			        		'spellmiss' : "The no. of tags missing: " + spellmiss,
			        		'adj' : "The no. of adjectives: " + adj, 
			        		'Noun' : "The no. of Noun " + Noun 
			        	        }
			        		};
			        
			            let json = JSON.stringify(ob,null,2);
					    fs.writeFile("result.json",json,"utf8",(err)=>{
						if(err)
							console.log(err);
						else {
							console.log("Success in writing JSON");
						}
				        });
					   });
			     });
			})

        })


