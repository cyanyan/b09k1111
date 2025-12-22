fetch('partials/nav.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('nav-placeholder').innerHTML = data;

    const tabs = document.querySelectorAll('.tab');
    const idConfig = {
      book: { page: 'book.html', title: 'Books' },
      lunar_practices: { page: 'moon.html', title: 'Lunar Practices' },
      exhibitions: { page: 'exhibitions.html', title: 'Exhibitions' },
      events: { page: 'events.html', title: 'Events' },
      about: { page: 'about.html', title: 'About' }
    };
    const defaultTitle = document.title;

    function openTabById(id) {
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
      document.body.classList.add('tab-open');
    }

    window.openTabById = openTabById;
  });
