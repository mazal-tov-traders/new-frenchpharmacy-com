const blogDataEl = document.querySelector("[data-section='blogs']");
const blogData = JSON.parse(blogDataEl.textContent);
const blogsData = blogData.blogs;

const tagsWrappers = document.querySelectorAll(".tags-wrapper");
const moreBtns = document.querySelectorAll(".tag-toggle.more");
const lessBtns = document.querySelectorAll(".tag-toggle.less");

moreBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      const tagsWrapper = btn.closest(".tags-wrapper");
      if (tagsWrapper) {
          tagsWrapper.classList.add("active");
      }
  });
});

lessBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      const tagsWrapper = btn.closest(".tags-wrapper");
      if (tagsWrapper) {
          tagsWrapper.classList.remove("active");
      }
  });
});

function formateDateToAdjust(dateString) {
  const parts = dateString.split(" ");
  const datePart = parts[0];
  const timePart = parts[1];
  const offsetPart = parts[2];
  const dateComponents = datePart.split("-");
  const timeComponents = timePart.split(":");
  const offsetValue = parseInt(offsetPart);
  const year = parseInt(dateComponents[0]);
  const month = parseInt(dateComponents[1]) - 1;
  const day = parseInt(dateComponents[2]);
  const hour = parseInt(timeComponents[0]);
  const minute = parseInt(timeComponents[1]);
  const second = parseInt(timeComponents[2]);
  const adjustedDate = new Date(
    Date.UTC(year, month, day, hour, minute, second) + offsetValue * 60 * 1000
  );

  return adjustedDate;
}

function renderSortedElements() {
  let blogArchiveElement = document.querySelector('[data-blog-archive]');

  let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

  let sortedElements = Array.from(document.querySelectorAll('[data-year-created]')).sort(function(a, b) {
      let yearA = parseInt(a.getAttribute('data-year-created'));
      let yearB = parseInt(b.getAttribute('data-year-created'));
      if (yearA !== yearB) {
          return yearB - yearA; 
      } else {
          let monthA = months.indexOf(a.getAttribute('data-month-created'));
          let monthB = months.indexOf(b.getAttribute('data-month-created'));
          return monthB - monthA;
      }
  });

  blogArchiveElement.innerHTML = '';

  sortedElements.forEach(function(element) {
      blogArchiveElement.appendChild(element);
  });
}



renderSortedElements();
