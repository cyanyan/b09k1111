(function() {

  const idConfig = {
      book: { page: 'book.html', title: 'Book' },
      lunar_practices: { page: 'moon.html', title: 'Lunar Practice' },
      exhibitions: { page: 'exhibitions.html', title: 'Exhibitions' },
      events: { page: 'events.html', title: 'Events' },
      about: { page: 'about.html', title: 'About' }
  };
  const defaultTitle = document.title;
  let tabs = null; 

  /**

   * @param {string} id 
   */
  function openTabById(id) {

      if (!tabs) {
          console.error("Tabs not initialized. Navigation structure not loaded yet.");
          return;
      }

      const tab = document.querySelector(`.tab[data-id="${id}"]`);
      if (!tab) return;
      const config = idConfig[id];
      const page = config ? config.page : null;
      

      if (tab.classList.contains('active')) {
          return;
      }
      
  
      tabs.forEach(t => {
          t.classList.remove('active');
          if (t !== tab) t.innerHTML = '';
      });
      

      document.querySelectorAll('.tab-labels .label').forEach(label => {
          label.classList.remove('active');
      });
      
  
      tab.classList.add('active');
      
  
      document.body.classList.add('tab-open');
      
   
      const label = document.querySelector(`.tab-labels .label[data-id="${id}"]`);
      if (label) {
          label.classList.add('active');
      }
      
 
      if (page) {
          let iframe = tab.querySelector('iframe');
          if (!iframe) {
              iframe = document.createElement('iframe');
              tab.appendChild(iframe);
          }
       
          if (iframe.getAttribute('src') !== page) {
              iframe.setAttribute('src', page);
          }
    
          if (config && config.title) {
              document.title = `B09K — ${config.title}`;
          }
      } else {
          document.title = defaultTitle;
      }
  }
  

  window.openTabById = openTabById;



  fetch('partials/nav.html')
      .then(res => res.text())
      .then(data => {
          document.getElementById('nav-placeholder').innerHTML = data;

       
          tabs = document.querySelectorAll('.tab');
          

          tabs.forEach(tab => {
              const id = tab.dataset.id;
              
              const handleTabClick = (e) => {
                  const target = e.target;
                  if (target.tagName === 'SPAN' || target.closest('span')) {
                      e.stopPropagation();
                      openTabById(id);
                  }
              };
              
              tab.addEventListener('click', handleTabClick);
          });
          

          const homeMain = document.querySelector('.home-main');
          if (homeMain) {
              homeMain.addEventListener('click', () => {
        
                  const activeTab = document.querySelector('.tab.active');
                  if (activeTab) {
                      activeTab.classList.remove('active');
                      document.body.classList.remove('tab-open');
                      document.title = defaultTitle;
      
                      document.querySelectorAll('.tab-labels .label').forEach(label => {
                          label.classList.remove('active');
                      });
                  }
              });
          }
      })
      .catch(error => {
          console.error('Error loading navigation:', error);
      });
})();