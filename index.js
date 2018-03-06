const fs = require('fs')
var natural = require('natural');
tagFile="./Documents/HTML_BASE.txt";
testFile="./Documents/HTML_CSS.txt";
baseFile="./Documents/HTML_CSS.txt";

baseNoun=0,baseAdjective=0,baseVerb=0;
testNoun=0,testAdjective=0,testVerb=0;
baseTags=0,testTags=0;

var path = require("path");
var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
var defaultCategory = 'N';
var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
var rules = new natural.RuleSet(rulesFilename);
var tagger = new natural.BrillPOSTagger(lexicon, rules);


//Reading the File containing all the HTML Tags,base file and fill to be tested
var tagData=fs.readFileSync(tagFile, 'utf8');
var baseData=fs.readFileSync(baseFile, 'utf8');
var testData=fs.readFileSync(testFile, 'utf8');

//Counting the no. of words of base and test document
var tokenizer = new natural.WordTokenizer();
var testWords=tokenizer.tokenize(testData);
var baseWords=tokenizer.tokenize(baseData);
var tagWords=tokenizer.tokenize(tagData);
testWordcount=testWords.length;
baseWordcount=baseWords.length;
tagWordcount=tagWords.length;
console.log(tagWordcount);

var baseTag=tagger.tag(testWords); //POS tagger to get verbs,nouns etc.
for(var i=0;i<baseTag.length;i++){
	//if the word is noun add in noun array
	if(baseTag[i][1]=='NN'|'NNS'|'NNP'|'NNPS'){
		baseNoun++;
	}
	//else if the word is adjective add in adjective array
	else if(baseTag[i][1]=='JJ'|'JJS'|'JJR'){
		baseAdjective++;
	}
	//if the word is verb add in verb array
	else if(baseTag[i][1]=='VB'|'VBD'|'VBG'|'VBN'|'VBP'|'VBZ'){
		baseVerb++;
	}
}

var testTag=tagger.tag(baseWords);//POS tagger to get verbs,nouns etc.
for(var i=0;i<testTag.length;i++){
	//if the word is noun add in noun array
	if(testTag[i][1]=='NN'|'NNS'|'NNP'|'NNPS'){
		testNoun++;
	}
	//else if the word is adjective add in adjective array
	else if(testTag[i][1]=='JJ'|'JJS'|'JJR'){
		testAdjective++;
	}
	//if the word is verb add in verb array
	else if(testTag[i][1]=='VB'|'VBD'|'VBG'|'VBN'|'VBP'|'VBZ'){
		testVerb++;
	}
}

for(var i=0; i<tagWords.length; i++)
			{
				for(var j=0; j<baseWords.length; j++)
				{
					if(tagData[i]==baseWords[j])
					{
						baseTags=baseTags+1;
						break;
					}
				}

				for(var j=0; j<testWords.length; j++)
				{
					if(tagData[i]==testWords[j])
					{
						testTags=testTags+1;
						break;
					}
				}
			}

	var result={
		base:{
			word_count:baseWordcount,
			nouns:baseNoun,
			adjectives:baseAdjective,
			verbs:baseVerb,
			tags_count:baseTags
		},
		test:{
			word_count:testWordcount,
			nouns:testNoun,
			adjectives:testAdjective,
			verbs:testVerb,
			tags_count:testTags
		}
	}

	var jsonData = JSON.stringify(result,null,2);
	fs.writeFileSync("./json/result.json",jsonData);
	 /* let json = JSON.stringify(result,null,2);
					    fs.writeFile("result.json",json,"utf8",(err)=>{
						if(err)
							console.log(err);
						else {
							console.log("Success in writing JSON");
						}
				        });*/
