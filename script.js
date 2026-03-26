// Dashboard Data
const dashboardData = {
    userName: "Reiki",
    stats: {
        sales: { value: 32000, change: 12 },
        orders: { value: 156, change: 8 },
        users: { value: 1284, change: 5 },
        messages: { value: 45, change: -3 }
    },
    recentOrders: [
        { id: "1234", customer: "John Wick", product: "Laptop Pro", amount: 1299, status: "Completed" },
        { id: "1235", customer: "John Marston", product: "Wireless Mouse", amount: 49, status: "Pending" },
        { id: "1236", customer: "Bob", product: "Monitor 4K", amount: 599, status: "Completed" },
        { id: "1237", customer: "Alisa Bosconovich", product: "Keyboard RGB", amount: 129, status: "Processing" },
        { id: "1238", customer: "Wilson0[oik", product: "Webcam HD", amount: 89, status: "Cancelled" }
    ],
    notifications: [
        { time: "2 hours ago", message: "New order received" },
        { time: "5 hours ago", message: "User registration spike" },
        { time: "4 days ago", message: "Monthly report ready" }
    ],
    progress: [
        { name: "Sales Target", value: 75, color: "primary" },
        { name: "Customer Satisfaction", value: 92, color: "success" },
        { name: "Product Delivery", value: 88, color: "info" }
    ]
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    animateStatCards();
});

// Initialize Dashboard with data
function initializeDashboard() {
    // Set user name
    document.getElementById('userName').textContent = dashboardData.userName;
    
    // Populate activity table
    populateActivityTable();
    
    // Populate notifications
    populateNotifications();
    
    // Populate progress bars
    populateProgressBars();
    
    // Update stats with animation
    updateStats();
}

// Populate Activity Table
function populateActivityTable() {
    const tbody = document.getElementById('activityTableBody');
    tbody.innerHTML = '';
    
    dashboardData.recentOrders.forEach(order => {
        const statusClass = getStatusClass(order.status);
        const row = `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.product}</td>
                <td>$${order.amount.toLocaleString()}</td>
                <td><span class="badge bg-${statusClass}">${order.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Get status badge color
function getStatusClass(status) {
    const statusMap = {
        'Completed': 'success',
        'Pending': 'warning',
        'Processing': 'info',
        'Cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
}

// Populate Notifications
function populateNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '';
    
    dashboardData.notifications.forEach(notification => {
        const item = `
            <div class="list-group-item px-0">
                <small class="text-muted">${notification.time}</small>
                <p class="mb-0">${notification.message}</p>
            </div>
        `;
        notificationsList.innerHTML += item;
    });
}

// Populate Progress Bars
function populateProgressBars() {
    const progressContainer = document.getElementById('progressBars');
    progressContainer.innerHTML = '';
    
    dashboardData.progress.forEach(item => {
        const progressBar = `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span>${item.name}</span>
                    <span>${item.value}%</span>
                </div>
                <div class="progress" style="height: 25px;">
                    <div class="progress-bar bg-${item.color}" role="progressbar" 
                         style="width: 0%" data-width="${item.value}%">
                        ${item.value}%
                    </div>
                </div>
            </div>
        `;
        progressContainer.innerHTML += progressBar;
    });
    
    // Animate progress bars after a short delay
    setTimeout(animateProgressBars, 500);
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// Update Statistics with Counter Animation
function updateStats() {
    animateCounter('totalSales', 0, dashboardData.stats.sales.value, '$', 5000);
    animateCounter('newOrders', 0, dashboardData.stats.orders.value, '', 1500);
    animateCounter('totalUsers', 0, dashboardData.stats.users.value, '', 1800);
    animateCounter('totalMessages', 0, dashboardData.stats.messages.value, '', 1200);
}

// Animate Counter
function animateCounter(elementId, start, end, prefix = '', duration = 2000) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = prefix + Math.floor(current).toLocaleString();
    }, 16);
}

// Animate Stat Cards on hover
function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[data-page]');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get page name
            const page = this.getAttribute('data-page');
            showNotification(`Navigating to ${page.charAt(0).toUpperCase() + page.slice(1)} page...`, 'info');
        });
    });
    
    // Export button
    document.getElementById('exportBtn').addEventListener('click', function() {
        showNotification('Exporting report...', 'success');
        setTimeout(() => {
            showNotification('Report exported successfully!', 'success');
        }, 2000);
    });
    
    // Quick action buttons
    document.getElementById('addProductBtn').addEventListener('click', function() {
        showNotification('Opening Add Product form...', 'primary');
    });
    
    document.getElementById('addUserBtn').addEventListener('click', function() {
        showNotification('Opening Add User form...', 'success');
    });
    
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        showNotification('Generating report...', 'info');
    });
    
    document.getElementById('sendNewsletterBtn').addEventListener('click', function() {
        showNotification('Preparing newsletter...', 'warning');
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logging out...', 'danger');
            setTimeout(() => {
                alert('You have been logged out successfully!');
            }, 1500);
        }
    });
    
    // Table row click
    const tableRows = document.querySelectorAll('#activityTableBody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const orderId = this.cells[0].textContent;
            showNotification(`Viewing details for order ${orderId}`, 'info');
        });
    });
}

// Show Notification (Toast-like)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '250px';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-info-circle me-2"></i>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Refresh Dashboard Data (simulated)
function refreshDashboard() {
    showNotification('Refreshing dashboard data...', 'info');
    
    // Simulate data update
    dashboardData.stats.sales.value += Math.floor(Math.random() * 100);
    dashboardData.stats.orders.value += Math.floor(Math.random() * 10);
    
    // Re-initialize dashboard
    initializeDashboard();
    
    setTimeout(() => {
        showNotification('Dashboard refreshed!', 'success');
    }, 1500);
}

// Auto-refresh every 30 seconds (optional)
// setInterval(refreshDashboard, 30000);

// Console welcome message
console.log('%c Dashboard Loaded Successfully! ', 'background: #fd0d0d; color: white; font-size: 16px; padding: 10px;');
console.log('Dashboard data:', dashboardData);