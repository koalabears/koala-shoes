window.onload = function() {
  main();

  function main() {
    var issueData = getIssueData(function(issueData) {
      buildPageFromIssueData(issueData);
      addEventListeners(issueData);
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
  }

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
      var html = '<div class = \'unviewedChange\'>';
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

  function addEventListeners(issueData) {
    var issueDivArray = getIssueDivArray();
    issueDivArray.forEach(function(issueDiv, index) {
      addClickToggle(issueDiv, issueData[index]);
      addButtonFunctionality(issueDiv, issueData[index]);
    });
  }

  function getIssueDivArray() {
    var issueDivs = document.getElementsByClassName('issue');
    return [].slice.apply(issueDivs);
  }

  function addClickToggle(issueDiv, issueData) {
    issueDiv.getElementsByTagName('h2')[0]
      .addEventListener('click', function(e) {
      var issueContentDiv = issueDiv.getElementsByClassName('issue-content')[0];
      e.stopPropagation();
      if (hasClass('showHistory', issueDiv)) {
        issueContentDiv.innerHTML = buildCollapsedIssueContentHTML(issueData);
      } else {
        issueContentDiv.innerHTML = buildExpandedIssueContentHTML(issueData);
      }
      if (!hasClass('active', issueDiv)) {
        toggleClass('hidden', issueDiv.getElementsByClassName('buttons')[0]);
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

  function addButtonFunctionality(issueDiv, issueData) {
    var buttons = issueDiv.getElementsByTagName('button');
    buttons[0].addEventListener('click', function(event) {
      event.stopPropagation();
      setIssueSeen(issueDiv, issueData);
    });
    buttons[1].addEventListener('click', function() {
      event.preventDefault();
      closeIssue(issueDiv, issueData);
    });
    buttons[2].addEventListener('click', function() {
      event.preventDefault();
      commentOnIssue(issueDiv, issueData);
    });
  }

  function setIssueSeen(issueDiv, issueData) {
    console.log('issue ' + issueData.id + ' seen');
  }

  function closeIssue(issueDiv, issueData) {
    console.log('issue ' + issueData.id + ' closed');
  }

  function commentOnIssue(issueDiv, issueData) {
    console.log('issue ' + issueData.id + ' commented on');
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
