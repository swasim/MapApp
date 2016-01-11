module.exports = {
  findTwitterTopic : function(topic, twitterContent) {
    twitterContent = twitterContent.toLowerCase();

    // Removes all punctionation and whitespace from string
    var removedPunctuation = twitterContent.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    removedPunctuation = removedPunctuation.replace(/\s{2,}/g," ");

    var twitterContentArray = removedPunctuation.split(' ');

    for(var i = 0; i < twitterContentArray.length; i++) {
      if (twitterContentArray[i] === topic) {
        return true;
      }
    }

    return false;
  }
};
