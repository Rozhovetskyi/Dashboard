(function() {
    class BaseWidget {
        constructor(id, title, config) {
            this.id = id;
            this.title = title || 'Untitled Widget';
            this.config = config || {};
        }

        render(container) {
            throw new Error("Method 'render' must be implemented.");
        }

        // Helper to create the standard card structure
        createCardElement() {
            const col = document.createElement('div');
            col.className = 'col s12 m6 l4'; // Responsive grid

            const card = document.createElement('div');
            card.className = 'card widget-card';

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';

            const cardTitle = document.createElement('span');
            cardTitle.className = 'card-title';
            cardTitle.textContent = this.title;

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-flat waves-effect waves-light right';
            deleteBtn.style.padding = '0';
            deleteBtn.style.margin = '0';
            deleteBtn.style.width = '24px';
            deleteBtn.style.height = '24px';
            deleteBtn.style.lineHeight = '24px';
            deleteBtn.style.minHeight = '0';
            deleteBtn.style.backgroundColor = 'transparent';
            deleteBtn.setAttribute('aria-label', `Delete ${this.title}`);

            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'material-icons white-text';
            deleteIcon.textContent = 'close';
            deleteBtn.appendChild(deleteIcon);

            deleteBtn.onclick = () => {
                // Dispatch a custom event for the dashboard manager to catch
                const event = new CustomEvent('widget-delete', { detail: { widgetId: this.id }, bubbles: true });
                col.dispatchEvent(event);
            };
            cardTitle.appendChild(deleteBtn);

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'btn-flat waves-effect waves-light right';
            editBtn.style.padding = '0';
            editBtn.style.margin = '0';
            editBtn.style.width = '24px';
            editBtn.style.height = '24px';
            editBtn.style.lineHeight = '24px';
            editBtn.style.minHeight = '0';
            editBtn.style.backgroundColor = 'transparent';
            editBtn.setAttribute('aria-label', `Edit ${this.title}`);

            const editIcon = document.createElement('i');
            editIcon.className = 'material-icons white-text';
            editIcon.textContent = 'edit';
            editBtn.appendChild(editIcon);

            editBtn.onclick = () => {
                const event = new CustomEvent('widget-edit', { detail: { widgetId: this.id }, bubbles: true });
                col.dispatchEvent(event);
            };
            cardTitle.appendChild(editBtn);

            const widgetBody = document.createElement('div');
            widgetBody.className = 'widget-body';

            cardContent.appendChild(cardTitle);
            cardContent.appendChild(widgetBody);
            card.appendChild(cardContent);
            col.appendChild(card);

            return { col, widgetBody };
        }
    }

    App.BaseWidget = BaseWidget;
})();
