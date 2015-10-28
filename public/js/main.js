window.onload = function() {
  var issueData;
  main();

  function main() {
    var issueData = getIssueData(function(issueData) {
      buildPageFromIssueData(issueData);
      addToggleFunctionality(issueData);
    });
  }

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
    var html = '<div class = \'issue\'>';
    html += '<h2>'+issue.title+'<\/h2>'
    var unviewedChanges = issue.unviewedIssueChanges;
    if (unviewedChanges && unviewedChanges.length !==0) {
        html += buildHtmlFromUnviewedIssueData(unviewedChanges);
        html += buildIssueButtonsHTML();
    }
    html += '<\/div>';
    return html;
  }

  function addToggleFunctionality(issueData) {
    var issueDivArray = getIssueDivArray();
    issueDivArray.forEach(function(issueDiv, index) {
      addClickToggle(issueDiv, issueData[index]);
    });
  }

  function getIssueDivArray() {
    var issueDivs = document.getElementsByClassName('issue');
    return [].slice.apply(issueDivs);
  }

  function addClickToggle(issueDiv, issueData) {
    issueDiv.addEventListener('click', function(e) {
      e.preventDefault();
      if (hasClass('showHistory', issueDiv)) {
        issueDiv.innerHTML = buildCollapsedIssueDiv(issueData);
      } else {
        issueDiv.innerHTML = "Woah!";
      }
      toggleClass('showHistory', issueDiv);
    });
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

  function buildIssueButtonsHTML() {
    var html = '<div>';
    html += buildButton('OK');
    html += buildButton('close');
    html += buildButton('comment');
    html += '<\/div>';
    return html;
  }

  function buildButton(name) {
    return '<button>' + name + '<\/button>'
  }

  function getIssueData(callback) {
    callback([
      {
        id: 1,
        title: 'Big issue',
        time: 5,
        unviewedIssueChanges: [
          {
            time: 8,
            type: 'comment',
            text: 'eo this is a test!'
          },
          {
            time: 9,
            type: 'comment',
            text: 'eo this is a test!'
          }
        ],
        viewedIssueChanges: [
          {
            time: 6,
            type: 'comment',
            text: 'eo this is a test but is not new...'
          }
        ]
      },
      {
        id: 2,
        time: 1,
        title: 'another issue',
        unviewedIssueChanges: [],
        viewedIssueChanges: [
          {
            time: 1,
            type: 'comment',
            text: 'eo this is the new issue but it has no changes'
          }
        ]
      }
    ]);
  }
};
