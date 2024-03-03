let tags = JSON.parse(document.getElementById("hiddenTags").dataset.tags);
tagNames = tags.map(t => t.tag_name);
tagger(document.querySelector('[name="noteTags"]'), {
  completion: {
    list: tagNames,
    delay: 400,
    min_length: 2,
  },
  link: function(name) {
    return false;
  },
  placeholder: "Start typing, press Enter to create a new tag",
});