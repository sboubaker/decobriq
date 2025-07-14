// Configuration object with folder structure - CORRECTED VERSION
const DOCS_STRUCTURE = {
    "1_Market_Consumer_Study": {
        title: "Market & Consumer Study",
        icon: "📊",
        files: [
            "Insulation_Cultural_Aesthetics_Tunisia.md",
            "Insulation_Market_Demand_Tunisia.md",
            "Insulation_Market_Segmentation_Tunisia.md",
            "Insulation_Pricing_and_Payment_Tunisia.md",
            "Insulation_Sales_Strategy_Tunisia.md",
            "Insulation_Trust_and_Communication_Tunisia.md"
        ]
    },
    "2_Waste_Supply_Composition_Study": {
        title: "Waste Supply & Composition",
        icon: "♻️",
        files: [
            "Textile_Waste_Collection_Legal_Integration_Tunisia.md",
            "Textile_Waste_Seasonal_Variability_Tunisia.md",
            "Textile_Waste_Supply_and_Composition_Tunisia.md"
        ]
    },
    "3_Tech_Production_Feasibility": {
        title: "Tech Production Feasibility",
        icon: "🔧",
        files: [
            "Tech_Production_Feasibility_Certification_Tunisia.md",
            "Tech_Production_Feasibility_Energy_Water_Tunisia.md",
            "Tech_Production_Feasibility_Machinery_Tunisia.md",
            "Tech_Production_Feasibility_Maintenance_Tunisia.md",
            "Tech_Production_Feasibility_Skills_Training_Tunisia.md"
        ]
    },
    "4_Environmental_Impact_LCA_Study": {
        title: "Environmental Impact & LCA",
        icon: "🌱",
        files: [
            "Environmental_Impact_CO2_Water_Savings_Tunisia.md",
            "Environmental_Impact_Microfiber_Leaching_Safety_Tunisia.md",
            "Environmental_Impact_Standards_Tests_Certification_Tunisia.md"
        ]
    },
    "5_Regulatory_Policy_Study": {
        title: "Regulatory & Policy",
        icon: "📋",
        files: [
            "Regulatory_EPR_Landfill_Tunisia.md",
            "Regulatory_Incentives_Grants_Tunisia.md",
            "Regulatory_Permits_Licenses_Tunisia.md"
        ]
    },
    "6_Financial_Business_Model_Study": {
        title: "Financial & Business Model",
        icon: "💰",
        files: [
            "Financial_CAPEX_Tunisia.md",
            "Financial_OPEX_Tunisia.md",
            "Financial_Pricing_Margins_Tunisia.md",
            "Financial_Risk_Resilience_Tunisia.md",
            "Regulatory_Import_Export_Quality_Tunisia.md"
        ]
    },
    "7_Distribution_Logistics_Study": {
        title: "Distribution & Logistics",
        icon: "🚚",
        files: [
            "Collection_Models_and_Logistics_Tunisia.md",
            "Packaging_Solutions_Building_Materials_Tunisia.md",
            "Sales_Channels_Building_Materials_Tunisia.md",
            "Transport_Storage_Infrastructure_Costs_Tunisia.md"
        ]
    },
    "8_Social_Impact_HR_Study": {
        title: "Social Impact & HR",
        icon: "👥",
        files: [
            "Social_Impact_HR_Impact_Monitoring_Tunisia.md",
            "Social_Impact_HR_Jobs_and_Staffing_Tunisia.md",
            "Social_Impact_HR_Training_and_Readiness_Tunisia.md",
            "Social_Impact_HR_Wages_Benefits_Subsidies_Tunisia.md"
        ]
    },
    "9_Risk_Resilience_Study": {
        title: "Risk & Resilience",
        icon: "⚠️",
        files: [
            "Risk_Resilience_Fraud_Theft_Embezzlement.md",
            "Risk_Resilience_Insurance_and_Disaster_Recovery.md",
            "Risk_Resilience_Subsidies_and_Policy_Risks.md",
            "Risk_Resilience_Waste_Supply_and_Demand.md"
        ]
    },
    "10_ScaleUp_Tech_Innovation_Study": {
        title: "ScaleUp & Tech Innovation",
        icon: "🚀",
        files: [
            "Pilot_Lab_Setup_and_Equipment.md",
            "R_and_D_Timeline_and_Budget.md",
            "Technology_Transfer_and_Licensing.md",
            "University_and_Stakeholder_Partnerships.md"
        ]
    },
    "11_Stakholders": {
        title: "Stakeholders",
        icon: "🤝",
        files: [
            "stakeholders.md"
        ]
    }
};

// Global variables
let currentFile = null;
let currentFolder = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        loadMarkdownFromHash(hash);
    }
});

// Initialize navigation menu
function initializeNavigation() {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = '';
    
    Object.keys(DOCS_STRUCTURE).forEach(folderId => {
        const folderData = DOCS_STRUCTURE[folderId];
        
        // Create main navigation item
        const navItem = document.createElement('li');
        navItem.className = 'nav-item';
        
        const navLink = document.createElement('a');
        navLink.className = 'nav-link';
        navLink.innerHTML = `${folderData.icon} ${folderData.title}`;
        navLink.onclick = () => toggleSubmenu(folderId);
        
        // Create submenu
        const submenu = document.createElement('ul');
        submenu.className = 'submenu';
        submenu.id = `submenu-${folderId}`;
        
        // Sort files alphabetically for better organization
        const sortedFiles = [...folderData.files].sort((a, b) => a.localeCompare(b));
        
        sortedFiles.forEach(file => {
            const submenuItem = document.createElement('li');
            const submenuLink = document.createElement('a');
            submenuLink.className = 'submenu-link';
            submenuLink.innerHTML = formatFileName(file);
            submenuLink.onclick = () => loadMarkdown(`${folderId}/${file}`);
            submenuItem.appendChild(submenuLink);
            submenu.appendChild(submenuItem);
        });
        
        navItem.appendChild(navLink);
        navItem.appendChild(submenu);
        navMenu.appendChild(navItem);
    });
}

// Toggle submenu visibility
function toggleSubmenu(folderId) {
    const submenu = document.getElementById(`submenu-${folderId}`);
    const navLink = submenu.previousElementSibling;
    
    // Close all other submenus
    document.querySelectorAll('.submenu').forEach(menu => {
        if (menu.id !== `submenu-${folderId}`) {
            menu.classList.remove('open');
            menu.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current submenu
    submenu.classList.toggle('open');
    navLink.classList.toggle('active');
}

// Format filename for display
function formatFileName(filename) {
    return filename
        .replace('.md', '')
        .replace(/_/g, ' ')
        .replace(/Tunisia/g, '🇹🇳')
        .replace(/\b\w/g, l => l.toUpperCase());
}

// Load markdown file
async function loadMarkdown(filePath) {
    try {
        // Show loading state
        showLoading();
        
        // Update URL hash
        window.location.hash = filePath;
        
        // Update navigation state
        updateNavigationState(filePath);
        
        // Fetch and render markdown
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        
        const markdownText = await response.text();
        const htmlContent = marked.parse(markdownText);
        
        // Update content
        document.getElementById('markdownContent').innerHTML = htmlContent;
        document.getElementById('markdownContent').classList.add('fade-in');
        
        // Update page title and breadcrumb
        const fileName = filePath.split('/').pop();
        const folderName = filePath.split('/')[0];
        const folderData = DOCS_STRUCTURE[folderName];
        
        document.getElementById('pageTitle').textContent = formatFileName(fileName);
        document.getElementById('breadcrumb').innerHTML = `
            <span>Home</span>
            <span style="margin: 0 0.5rem;">›</span>
            <span>${folderData.title}</span>
            <span style="margin: 0 0.5rem;">›</span>
            <span>${formatFileName(fileName)}</span>
        `;
        
        // Update document title
        document.title = `${formatFileName(fileName)} - DecoBriq Docs`;
        
        // Highlight code blocks
        Prism.highlightAll();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Store current file
        currentFile = filePath;
        
    } catch (error) {
        console.error('Error loading markdown:', error);
        showError(`Failed to load document: ${filePath}`);
    }
}

// Load markdown from URL hash
function loadMarkdownFromHash(hash) {
    const filePath = decodeURIComponent(hash);
    if (filePath && filePath.includes('/')) {
        loadMarkdown(filePath);
    }
}

// Update navigation state
function updateNavigationState(filePath) {
    // Remove all active states
    document.querySelectorAll('.nav-link, .submenu-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate current file
    const [folderId, fileName] = filePath.split('/');
    const submenu = document.getElementById(`submenu-${folderId}`);
    
    if (submenu) {
        // Open submenu
        submenu.classList.add('open');
        submenu.previousElementSibling.classList.add('active');
        
        // Activate submenu item
        const submenuLinks = submenu.querySelectorAll('.submenu-link');
        submenuLinks.forEach(link => {
            if (link.onclick.toString().includes(fileName)) {
                link.classList.add('active');
            }
        });
    }
}

// Show loading state
function showLoading() {
    document.getElementById('markdownContent').innerHTML = '<div class="loading">Loading document</div>';
    document.getElementById('pageTitle').textContent = 'Loading...';
    document.getElementById('breadcrumb').innerHTML = '<span>Loading...</span>';
}

// Show error message
function showError(message) {
    document.getElementById('markdownContent').innerHTML = `
        <div class="error-message">
            <h3>Error</h3>
            <p>${message}</p>
            <p>Please try again or contact support if the problem persists.</p>
        </div>
    `;
    document.getElementById('pageTitle').textContent = 'Error';
    document.getElementById('breadcrumb').innerHTML = '<span>Error</span>';
}

// Handle browser back/forward
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        loadMarkdownFromHash(hash);
    } else {
        // Reset to home
        showHomePage();
    }
});

// Show home page
function showHomePage() {
    document.getElementById('pageTitle').textContent = 'Welcome to DecoBriq Docs';
    document.getElementById('breadcrumb').innerHTML = '<span>Home</span>';
    document.title = 'DecoBriq Docs';
    
    // Remove active states
    document.querySelectorAll('.nav-link, .submenu-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Close all submenus
    document.querySelectorAll('.submenu').forEach(menu => {
        menu.classList.remove('open');
    });
    
    // Show welcome content
    document.getElementById('markdownContent').innerHTML = `
        <div class="welcome-message">
            <h2>📚 Welcome to DecoBriq Documentation</h2>
            <p>This documentation hub contains comprehensive information about DecoBriq's various studies and analyses. Use the navigation menu on the left to explore different sections.</p>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>11</h3>
                    <p>Study Categories</p>
                </div>
                <div class="stat-card">
                    <h3>40+</h3>
                    <p>Research Documents</p>
                </div>
                <div class="stat-card">
                    <h3>Tunisia</h3>
                    <p>Market Focus</p>
                </div>
            </div>

            <div class="quick-links">
                <h3>Quick Access</h3>
                <ul>
                    <li><a href="#" onclick="loadMarkdown('1_Market_Consumer_Study/Insulation_Market_Demand_Tunisia.md')">Market Demand Analysis</a></li>
                    <li><a href="#" onclick="loadMarkdown('2_Waste_Supply_Composition_Study/Textile_Waste_Supply_and_Composition_Tunisia.md')">Waste Supply Study</a></li>
                    <li><a href="#" onclick="loadMarkdown('3_Tech_Production_Feasibility/Tech_Production_Feasibility_Machinery_Tunisia.md')">Production Feasibility</a></li>
                    <li><a href="#" onclick="loadMarkdown('11_Stakholders/stakeholders.md')">Stakeholders Overview</a></li>
                </ul>
            </div>
        </div>
    `;
    
    currentFile = null;
}

// Search functionality (future enhancement)
function searchDocuments(query) {
    // This could be implemented to search through all markdown files
    console.log('Search functionality to be implemented:', query);
}

// Mobile menu toggle (future enhancement)
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to go home
    if (e.key === 'Escape') {
        window.location.hash = '';
        showHomePage();
    }
    
    // Ctrl/Cmd + K for search (future enhancement)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Implement search modal
        console.log('Search shortcut pressed');
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Print functionality
function printCurrentDocument() {
    if (currentFile) {
        window.print();
    } else {
        alert('Please select a document to print.');
    }
}

// Export functionality (future enhancement)
function exportCurrentDocument(format) {
    if (currentFile) {
        console.log(`Export ${currentFile} as ${format}`);
        // Implementation for PDF/Word export
    } else {
        alert('Please select a document to export.');
    }
} 