window.onload = function() {
  main();
  HTMLBuilder = buildHTML();
  function main() {
    var issueData = getIssueData(function(issueData) {
      HTMLBuilder.buildPageFromIssueData(issueData);
      addEventListeners(issueData);
    });
  }


  function addEventListeners(issueData) {
    var issueDivArray = HTMLBuilder.getIssueDivArray();
    issueDivArray.forEach(function(issueDiv, index) {
      addClickToggle(issueDiv, issueData[index]);
      addButtonFunctionality(issueDiv, issueData[index]);
    });
  }

  function addClickToggle(issueDiv, issueData) {
    issueDiv.getElementsByTagName('h2')[0]
      .addEventListener('click', function(event) {
      var issueContentDiv = issueDiv.getElementsByClassName('issue-content')[0];
      event.stopPropagation();
      if (hasClass('showHistory', issueDiv)) {
        issueContentDiv.innerHTML = buildCollapsedIssueContentHTML(issueData);
      } else {
        issueContentDiv.innerHTML = buildExpandedIssueContentHTML(issueData);
      }
      if (!HTMLBuilder.hasClass('active', issueDiv)) {
        HTMLBuilder.toggleClass('hidden', issueDiv.getElementsByClassName('buttons')[0]);
      }
      HTMLBuilder.toggleClass('showHistory', issueDiv)
    });
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
