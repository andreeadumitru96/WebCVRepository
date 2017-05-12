/**
 * Created by Andreea on 5/6/2017.
 */
webCV.MainApplication = function(){
    this.initComponent();
};

webCV.MainApplication.prototype = {
   xmlConvertedToStringFile: null,

  initComponent: function () {
      this.attachListeners();
  },
    attachListeners: function(){
        $('#xmlUploadedFile').on('change', $.proxy(this.uploadXmlFile, this));
    },
    uploadXmlFile: function(e){
        var thisObj = this;
        var files = e.target.files;
        var reader = new FileReader();
        reader.onload = function() {
            thisObj.xmlConvertedToStringFile = this.result;
            thisObj.parseXMLFile();
            $("#mainContainer").css('background-image', 'none');
            $('#mainContainer').css('background-color','#222');
            $('#xmlUploadedFile').hide();
            $('.file-upload-block').css('display', 'none');
        };
        reader.readAsText(files[0]);

    },

    renderInHTML: function (param) {

        $('#container').load('./cvTemplate.html', function() {
            var parsedHTMLFile = $('#cv').html();
            var configObject = {
                data:param
            };
            var html = Mustache.to_html(parsedHTMLFile, configObject);
            $('#cv').html(html);
        });

    },

    parseXMLFile: function () {
        var xmlString = $.parseXML(this.xmlConvertedToStringFile);

        var $xml = $(xmlString);

        var xmlNodes = {
            personalInformation: {
                firstName: $xml.find("personalInformation").find("firstName").text(),
                lastName: $xml.find("personalInformation").find("lastName").text(),
                address: $xml.find("personalInformation").find("address").text(),
                phoneNumber: $xml.find("personalInformation").find("phoneNumber").text(),
                email: $xml.find("personalInformation").find("email").text(),
                sex: $xml.find("personalInformation").find("sex").text(),
                dateOfBirth: $xml.find("personalInformation").find("dateOfBirth").text(),
                nationality: $xml.find("personalInformation").find("nationality").text()
            },

            jobAppliedFor: $xml.find("jobAppliedFor").text(),

            educationAndTraining: {
                highSchool:{
                    name: $xml.find("educationAndTraining").find("highSchool").find("name").text(),
                    timeInterval: $xml.find("educationAndTraining").find("highSchool").find("timeInterval").text()

                },
                university: {
                    name: $xml.find("educationAndTraining").find("university").find("name").text(),
                    timeInterval: $xml.find("educationAndTraining").find("university").find("timeInterval").text()
                },
                training1: {
                    name: $xml.find("educationAndTraining").find("training1").find("name").text(),
                    timeInterval: $xml.find("educationAndTraining").find("training1").find("timeInterval").text()
                },

                training2: {
                    name: $xml.find("educationAndTraining").find("training2").find("name").text(),
                    timeInterval: $xml.find("educationAndTraining").find("training2").find("timeInterval").text()
                }
            },
            languages : {
                secondLanguage: {
                    name: $xml.find("languages").find("secondLanguage").find("name").text(),
                    understandingLevel: {
                        listeningLevel: $xml.find("languages").find("secondLanguage").find("understandingLevel").find("listeningLevel").text(),
                        readingLevel: $xml.find("languages").find("secondLanguage").find("understandingLevel").find("readingLevel").text()
                    },
                    speakingLevel: {
                        spokenInteractionLevel: $xml.find("languages").find("secondLanguage").find("speakingLevel").find("spokenInteractionLevel").text(),
                        spokenProductionLevel: $xml.find("languages").find("secondLanguage").find("speakingLevel").find("spokenInteractionLevel").text(),

                    },
                    writingLevel: $xml.find("languages").find("secondLanguage").find("writingLevel").text()
                },
                thirdLanguage: {
                    name: $xml.find("languages").find("thirdLanguage").find("name").text(),
                    reference: $xml.find("languages").find("thirdLanguage").find("reference").text(),
                    understandingLevel: {
                        listeningLevel: $xml.find("languages").find("thirdLanguage").find("understandingLevel").find("listeningLevel").text(),
                        readingLevel: $xml.find("languages").find("thirdLanguage").find("understandingLevel").find("readingLevel").text()
                    },
                    speakingLevel: {
                        spokenInteractionLevel: $xml.find("languages").find("thirdLanguage").find("speakingLevel").find("spokenInteractionLevel").text(),
                        spokenProductionLevel: $xml.find("languages").find("thirdLanguage").find("speakingLevel").find("spokenInteractionLevel").text(),

                    },
                    writingLevel: $xml.find("languages").find("thirdLanguage").find("writingLevel").text()
                }

            },

            communicationSkills: {
                skill1: $xml.find("communicationSkills").find("skill1").text(),
                skill2: $xml.find("communicationSkills").find("skill2").text(),
                skill3: $xml.find("communicationSkills").find("skill3").text(),
                skill4: $xml.find("communicationSkills").find("skill4").text(),
                skill5: $xml.find("communicationSkills").find("skill5").text(),
                skill6: $xml.find("communicationSkills").find("skill6").text(),
                skill7: $xml.find("communicationSkills").find("skill7").text()
            },

            digitalCompetence: $xml.find("digitalCompetence").text(),

            knowledge: {
                idea1: $xml.find("knowledge").find("idea1").text(),
                idea2: $xml.find("knowledge").find("idea2").text(),
                idea3: $xml.find("knowledge").find("idea3").text(),
                idea4: $xml.find("knowledge").find("idea4").text(),
                idea5: $xml.find("knowledge").find("idea5").text(),
                idea6: $xml.find("knowledge").find("idea6").text()
            },

            references: $xml.find("references").text()
        };
        this.renderInHTML(xmlNodes);

    }
};


