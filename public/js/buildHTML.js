function buildHTML() {

    function buildPageFromIssueData(issueData) {
      var contentWrapperDiv = getContentWrapperDiv();
      var issueDataAsHtml = buildHtmlFromIssueData(issueData);
      contentWrapperDiv.innerHTML = issueDataAsHtml;
      return issueData;
    }

    function getContentWrapperDiv() {
      return document.getElementsByClassName('wrapper-main')[0];
    }

    function buildHtmlFromIssueData(issueData) {
      return issueData.map(buildCollapsedIssueDiv).join('');
    };

    function buildCollapsedIssueDiv(issue) {
      var html = '';
      var unviewedChanges = issue.unviewedIssueChanges;
      if (unviewedChanges && unviewedChanges.length !==0) {
        html += '<div class = \'issue active\'>';
        html += '<h2>' + issue.title + '<\/h2><div class=\'issue-content\'>';
        html += buildCollapsedIssueContentHTML(issue);
        html += buildVisibleIssueButtonsHTML();
      } else {
        html += '<div class = \'issue\'>';
        html += '<h2>' + issue.title + '<\/h2><div class=\'issue-content\'>';
        html += buildCollapsedIssueContentHTML(issue);
        html += buildHiddenIssueButtonsHTML();
      }
      html += '<\/div>';
      return html;
    }

    function buildCollapsedIssueContentHTML(issue) {
      var unviewedChanges = issue.unviewedIssueChanges;
      var html = '';
      if (unviewedChanges && unviewedChanges.length !==0) {
        html += buildHtmlFromUnviewedIssueData(unviewedChanges);
        html += '<\/div>';
      } else {
        html += '<\/div>';
      }
      return html;
    }

    function buildExpandedIssueContentHTML(issue) {
      var unviewedChanges = issue.unviewedIssueChanges;
      var viewedChanges = issue.viewedIssueChanges;
      var html = '';
      if (unviewedChanges && unviewedChanges.length !==0) {
          html += buildHtmlFromUnviewedIssueData(unviewedChanges);
      }
      if (viewedChanges && viewedChanges.length !==0) {
          html += buildHtmlFromViewedIssueData(viewedChanges);
      }
      return html;
    }

    function buildHtmlFromUnviewedIssueData(unviewedChanges) {
      return unviewedChanges.map(function(unviewedChange) {
        var html = '<div class = \'unviewedChange\'>'
        if (unviewedChange.type === 'comment') {
          html += unviewedChange.text;
        }
        html += '<\/div>';
        return html;
      }).join('');
    }

    function buildHtmlFromViewedIssueData(viewedChanges) {
      return viewedChanges.map(function(viewedChange) {
        var html = '<div class = \'viewedChange\'>';
        if (viewedChange.type === 'comment') {
          html += viewedChange.text;
        }
        html += '<\/div>';
        return html;
      }).join('');
    }

    function getIssueDivArray() {
      var issueDivs = document.getElementsByClassName('issue');
      return [].slice.apply(issueDivs);
    }

    function hasClass(className, htmlObj) {
      var re = new RegExp("\\b("+className+")\\b");
      return re.test(htmlObj.className);
    }

    function toggleClass(className, htmlObj) {
      var re = new RegExp("\\b("+className+")\\b");
      if (hasClass(className, htmlObj)) {
        htmlObj.className = htmlObj.className.replace(re, '');
      } else {
        htmlObj.className += ' ' + className;
        htmlObj.className = htmlObj.className.replace(/  +/g, ' ');
      }
    }

    function buildHiddenIssueButtonsHTML() {
      var html = '<div class=\'buttons hidden\'>';
      html += buildButtonsHTML();
      html += '<\/div>';
      return html;
    }

    function buildVisibleIssueButtonsHTML() {
      var html = '<div class=\'buttons\'>';
      html += buildButtonsHTML();
      html += '<\/div>';
      return html;
    }

    function buildButtonsHTML() {
      return buildButton('OK') + buildButton('close') + buildButton('comment');
    }


    function buildButton(name) {
      return '<button>' + name + '<\/button>';
    }

    return {
      buildPageFromIssueData: buildPageFromIssueData,
      getContentWrapperDiv: getContentWrapperDiv,
      buildHtmlFromIssueData: buildHtmlFromIssueData,
      buildCollapsedIssueDiv: buildCollapsedIssueDiv,
      buildCollapsedIssueContentHTML: buildCollapsedIssueContentHTML,
      buildExpandedIssueContentHTML: buildExpandedIssueContentHTML,
      buildHtmlFromUnviewedIssueData: buildHtmlFromUnviewedIssueData,
      buildHtmlFromViewedIssueData: buildHtmlFromViewedIssueData,
      getIssueDivArray: getIssueDivArray,
      hasClass: hasClass ,
      toggleClass: toggleClass,
      buildHiddenIssueButtonsHTML: buildHiddenIssueButtonsHTML,
      buildVisibleIssueButtonsHTML: buildVisibleIssueButtonsHTML,
      buildButtonsHTML: buildButtonsHTML,
      buildButton: buildButton
    };


};
