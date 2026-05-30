/* ==========================================================================
   TITANIC DATA LAB - FRONTEND PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Global Application Portfolio State
    const State = {
        // Multi-Task Selector
        currentTask: "task1", // "task1", "task2", "task3", or "task4"
        activeTab: "presentation-tab", // active UI tab
        theme: "dark",

        // Task 1 Presentation State
        t1CurrentSlide: 1,
        t1TotalSlides: 9,

        // Task 2 Presentation State
        t2CurrentSlide: 1,
        t2TotalSlides: 7,

        // Task 3 Presentation State
        t3CurrentSlide: 1,
        t3TotalSlides: 8,

        // Task 4 Presentation State
        t4CurrentSlide: 1,
        t4TotalSlides: 8,
        t4ActiveChapter: 1,

        // Task 5 Presentation State
        t5CurrentSlide: 1,
        t5TotalSlides: 9,

        t5Simulator: {
            sex: "male",
            age: 29.36,
            pclass: 3,
            fare: 32.20,
            sibsp: 0,
            parch: 0,
            embarked: "S"
        },
        
        // Task 1 Data Explorer Settings
        t1Filters: {
            name: "",
            survived: "all",
            pclass: "all",
            sex: "all"
        },
        t1Pagination: {
            currentPage: 1,
            pageSize: 10,
            filteredData: []
        },
        t1ActiveViz: "gender-survival",

        // Task 2 Cleaning Lab State
        labCleaningStatus: "raw", // "raw" or "clean"

        // Task 3 EDA Laboratory State
        t3ActiveViz: "age-hist-density"
    };

    // DOM Element Cache
    const DOM = {
        body: document.body,
        navButtons: document.querySelectorAll(".nav-btn"),
        tabContents: document.querySelectorAll(".tab-content"),
        themeToggle: document.getElementById("theme-toggle"),
        printBtn: document.getElementById("print-report-btn"),
        taskSwitcher: document.getElementById("global-task-switcher"),
        
        // Task Panels Visibility
        task1Slides: document.getElementById("task1-slides"),
        task2Slides: document.getElementById("task2-slides"),
        task3Slides: document.getElementById("task3-slides"),
        task4Slides: document.getElementById("task4-slides"),
        task5Slides: document.getElementById("task5-slides"),
        task1ReportToc: document.getElementById("task1-report-toc"),
        task2ReportToc: document.getElementById("task2-report-toc"),
        task3ReportToc: document.getElementById("task3-report-toc"),
        task4ReportToc: document.getElementById("task4-report-toc"),
        task5ReportToc: document.getElementById("task5-report-toc"),
        task1ReportBody: document.getElementById("task1-report-body"),
        task2ReportBody: document.getElementById("task2-report-body"),
        task3ReportBody: document.getElementById("task3-report-body"),
        task4ReportBody: document.getElementById("task4-report-body"),
        task5ReportBody: document.getElementById("task5-report-body"),
        task1ExplorerView: document.getElementById("task1-explorer-view"),
        task2ExplorerView: document.getElementById("task2-explorer-view"),
        task3ExplorerView: document.getElementById("task3-explorer-view"),
        task4ExplorerView: document.getElementById("task4-explorer-view"),
        task5ExplorerView: document.getElementById("task5-explorer-view"),
        explorerNavBtn: document.getElementById("explorer-nav-btn"),

        // General Slideshow controls
        prevSlideBtn: document.getElementById("prev-slide-btn"),
        nextSlideBtn: document.getElementById("next-slide-btn"),
        fsSlideBtn: document.getElementById("fs-slide-btn"),
        progressBar: document.getElementById("slide-progress-bar"),
        slideDisplay: document.getElementById("slide-number-display"),
        
        // Task 1 Explorer elements
        searchName: document.getElementById("search-name"),
        filterSurvived: document.getElementById("filter-survived"),
        filterPclass: document.getElementById("filter-pclass"),
        filterSex: document.getElementById("filter-sex"),
        resetFiltersBtn: document.querySelector(".reset-filters-action"),
        registryTableBody: document.querySelector(".registry-table-body-element"),
        recordCount: document.querySelector(".record-count-indicator"),
        prevPageBtn: document.querySelector(".prev-page-action"),
        nextPageBtn: document.querySelector(".next-page-action"),
        pageNumbersContainer: document.querySelector(".page-numbers-container-element"),
        
        // Task 1 Chart switcher buttons
        vizBtns: document.querySelectorAll(".viz-btn"),
        chartBoxes: document.querySelectorAll(".chart-box"),

        // Task 2 Preprocessing Lab elements
        runCleaningBtn: document.getElementById("run-preprocessing-btn"),
        resetLabBtn: document.getElementById("reset-lab-btn"),
        terminalConsole: document.getElementById("terminal-console"),
        cleanCompletenessPct: document.getElementById("clean-completeness-pct"),
        cleanMissingCount: document.getElementById("clean-missing-count"),

        // Task 3 EDA Laboratory elements
        edaBtns: document.querySelectorAll(".eda-btn"),
        svgEDALab: document.getElementById("svg-eda-laboratory"),
        edaChartTitleIndicator: document.getElementById("eda-chart-title-indicator"),
        edaChartSubtitleIndicator: document.getElementById("eda-chart-subtitle-indicator"),
        
        // Task 4 Storytelling Dashboard elements
        tourPrevBtn: document.getElementById("tour-prev-btn"),
        tourNextBtn: document.getElementById("tour-next-btn"),
        tourChapterTitle: document.getElementById("tour-chapter-title"),
        tourChapterText: document.getElementById("tour-chapter-text"),
        tourProgressIndicator: document.getElementById("tour-progress-indicator"),
        
        // Task 5 Predictive Lab elements
        simSex: document.getElementById("sim-sex"),
        simAge: document.getElementById("sim-age"),
        simPclass: document.getElementById("sim-pclass"),
        simFare: document.getElementById("sim-fare"),
        simSibspDec: document.getElementById("sim-sibsp-dec"),
        simSibspInc: document.getElementById("sim-sibsp-inc"),
        simParchDec: document.getElementById("sim-parch-dec"),
        simParchInc: document.getElementById("sim-parch-inc"),
        simEmbarked: document.getElementById("sim-embarked"),

        valSimSex: document.getElementById("val-sim-sex"),
        valSimAge: document.getElementById("val-sim-age"),
        valSimPclass: document.getElementById("val-sim-pclass"),
        valSimFare: document.getElementById("val-sim-fare"),
        valSimSibsp: document.getElementById("val-sim-sibsp"),
        valSimParch: document.getElementById("val-sim-parch"),
        valSimEmbarked: document.getElementById("val-sim-embarked"),

        simProbPct: document.getElementById("sim-prob-pct"),
        simGaugeCircle: document.getElementById("sim-gauge-circle"),
        simOutcomeBadge: document.getElementById("sim-outcome-badge"),
        simZscoreDisplay: document.getElementById("sim-zscore-display"),
        svgSimImportance: document.getElementById("svg-sim-importance"),
        svgSimConfusion: document.getElementById("svg-sim-confusion"),
        
        // Scroll navigation TOC links
        tocLinks: document.querySelectorAll(".toc-link")
    };

    // Initialize Titanic dataset array safety check
    const rawData = window.titanicData || [];
    const cleanData = window.titanicCleanData || [];
    State.t1Pagination.filteredData = [...rawData];

    /* ==========================================================================
       1. Global Task & Switcher Management
       ========================================================================== */
    function switchTask(taskId) {
        State.currentTask = taskId;

        // Reset visibility of all tasks first
        const taskContainers = [
            DOM.task1Slides, DOM.task2Slides, DOM.task3Slides, DOM.task4Slides, DOM.task5Slides,
            DOM.task1ReportToc, DOM.task2ReportToc, DOM.task3ReportToc, DOM.task4ReportToc, DOM.task5ReportToc,
            DOM.task1ReportBody, DOM.task2ReportBody, DOM.task3ReportBody, DOM.task4ReportBody, DOM.task5ReportBody,
            DOM.task1ExplorerView, DOM.task2ExplorerView, DOM.task3ExplorerView, DOM.task4ExplorerView, DOM.task5ExplorerView
        ];
        taskContainers.forEach(container => {
            if (container) container.classList.remove("active");
        });

        if (taskId === "task1") {
            DOM.task1Slides.classList.add("active");
            DOM.task1ReportToc.classList.add("active");
            DOM.task1ReportBody.classList.add("active");
            DOM.task1ExplorerView.classList.add("active");
            DOM.explorerNavBtn.innerHTML = '<i class="fa-solid fa-chart-pie"></i> Dataset Explorer';
            
            if (State.activeTab === "presentation-tab") goToSlide(State.t1CurrentSlide);
            if (State.activeTab === "explorer-tab") {
                filterDataset(); 
                renderActiveChart();
            }
        } else if (taskId === "task2") {
            DOM.task2Slides.classList.add("active");
            DOM.task2ReportToc.classList.add("active");
            DOM.task2ReportBody.classList.add("active");
            DOM.task2ExplorerView.classList.add("active");
            DOM.explorerNavBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Preprocessing Lab';

            if (State.activeTab === "presentation-tab") goToSlide(State.t2CurrentSlide);
            if (State.activeTab === "explorer-tab") {
                renderPreprocessingLab();
            }
        } else if (taskId === "task3") {
            DOM.task3Slides.classList.add("active");
            DOM.task3ReportToc.classList.add("active");
            DOM.task3ReportBody.classList.add("active");
            DOM.task3ExplorerView.classList.add("active");
            DOM.explorerNavBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart"></i> Interactive EDA Lab';

            if (State.activeTab === "presentation-tab") goToSlide(State.t3CurrentSlide);
            if (State.activeTab === "explorer-tab") {
                renderEDALaboratory();
            }
        } else if (taskId === "task4") {
            DOM.task4Slides.classList.add("active");
            DOM.task4ReportToc.classList.add("active");
            DOM.task4ReportBody.classList.add("active");
            DOM.task4ExplorerView.classList.add("active");
            DOM.explorerNavBtn.innerHTML = '<i class="fa-solid fa-chart-line"></i> Storytelling Dashboard';

            if (State.activeTab === "presentation-tab") goToSlide(State.t4CurrentSlide);
            if (State.activeTab === "explorer-tab") {
                renderStorytellingDashboard();
            }
        } else if (taskId === "task5") {
            DOM.task5Slides.classList.add("active");
            DOM.task5ReportToc.classList.add("active");
            DOM.task5ReportBody.classList.add("active");
            DOM.task5ExplorerView.classList.add("active");
            DOM.explorerNavBtn.innerHTML = '<i class="fa-solid fa-calculator"></i> Predictive Modeling Lab';

            if (State.activeTab === "presentation-tab") goToSlide(State.t5CurrentSlide);
            if (State.activeTab === "explorer-tab") {
                renderPredictiveLab();
            }
        }

        // TOC active highlight reset
        highlightTOC();
    }

    DOM.taskSwitcher.addEventListener("change", (e) => {
        switchTask(e.target.value);
    });

    /* ==========================================================================
       2. Tabs Navigation System
       ========================================================================== */
    function switchTab(tabId) {
        State.activeTab = tabId;

        DOM.navButtons.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
        });

        DOM.tabContents.forEach(content => {
            content.classList.toggle("active", content.id === tabId);
        });

        DOM.printBtn.classList.toggle("hidden", tabId !== "report-tab");

        if (tabId === "presentation-tab") {
            const slideToLoad = State.currentTask === "task1" 
                ? State.t1CurrentSlide 
                : State.currentTask === "task2" 
                ? State.t2CurrentSlide 
                : State.currentTask === "task3"
                ? State.t3CurrentSlide
                : State.currentTask === "task4"
                ? State.t4CurrentSlide
                : State.t5CurrentSlide;
            goToSlide(slideToLoad);
        }

        if (tabId === "explorer-tab") {
            if (State.currentTask === "task1") {
                filterDataset();
                renderActiveChart();
            } else if (State.currentTask === "task2") {
                renderPreprocessingLab();
            } else if (State.currentTask === "task3") {
                renderEDALaboratory();
            } else if (State.currentTask === "task4") {
                renderStorytellingDashboard();
            } else if (State.currentTask === "task5") {
                renderPredictiveLab();
            }
        }
    }

    DOM.navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    /* ==========================================================================
       3. Presentation Slideshow Engine
       ========================================================================== */
    function goToSlide(slideNum) {
        const isT1 = (State.currentTask === "task1");
        const isT2 = (State.currentTask === "task2");
        const isT3 = (State.currentTask === "task3");
        const isT4 = (State.currentTask === "task4");
        const total = isT1 ? State.t1TotalSlides 
            : isT2 ? State.t2TotalSlides 
            : isT3 ? State.t3TotalSlides 
            : isT4 ? State.t4TotalSlides 
            : State.t5TotalSlides;

        if (slideNum < 1) slideNum = 1;
        if (slideNum > total) slideNum = total;

        // Save current slide state
        if (isT1) {
            State.t1CurrentSlide = slideNum;
        } else if (isT2) {
            State.t2CurrentSlide = slideNum;
        } else if (isT3) {
            State.t3CurrentSlide = slideNum;
        } else if (isT4) {
            State.t4CurrentSlide = slideNum;
        } else {
            State.t5CurrentSlide = slideNum;
        }

        const activeContainer = isT1 ? DOM.task1Slides 
            : isT2 ? DOM.task2Slides 
            : isT3 ? DOM.task3Slides 
            : isT4 ? DOM.task4Slides 
            : DOM.task5Slides;
        const slides = activeContainer.querySelectorAll(".slide");

        slides.forEach(slide => {
            slide.classList.toggle("active", parseInt(slide.getAttribute("data-slide")) === slideNum);
        });

        DOM.prevSlideBtn.disabled = (slideNum === 1);
        DOM.nextSlideBtn.disabled = (slideNum === total);

        const percent = ((slideNum - 1) / (total - 1)) * 100;
        DOM.progressBar.style.width = `${percent}%`;
        DOM.slideDisplay.innerText = `Slide ${slideNum} of ${total}`;
    }

    DOM.prevSlideBtn.addEventListener("click", () => {
        const current = State.currentTask === "task1" 
            ? State.t1CurrentSlide 
            : State.currentTask === "task2" 
            ? State.t2CurrentSlide 
            : State.currentTask === "task3"
            ? State.t3CurrentSlide
            : State.currentTask === "task4"
            ? State.t4CurrentSlide
            : State.t5CurrentSlide;
        goToSlide(current - 1);
    });

    DOM.nextSlideBtn.addEventListener("click", () => {
        const current = State.currentTask === "task1" 
            ? State.t1CurrentSlide 
            : State.currentTask === "task2" 
            ? State.t2CurrentSlide 
            : State.currentTask === "task3"
            ? State.t3CurrentSlide
            : State.currentTask === "task4"
            ? State.t4CurrentSlide
            : State.t5CurrentSlide;
        goToSlide(current + 1);
    });

    /* ==========================================================================
       4. Task 1: Dataset Explorer & SVG Charts
       ========================================================================== */
    function filterDataset() {
        const nameSearch = State.t1Filters.name.toLowerCase();
        const survSelect = State.t1Filters.survived;
        const classSelect = State.t1Filters.pclass;
        const sexSelect = State.t1Filters.sex;

        State.t1Pagination.filteredData = rawData.filter(passenger => {
            const matchesName = passenger.Name.toLowerCase().includes(nameSearch);
            
            let matchesSurvival = true;
            if (survSelect !== "all") {
                matchesSurvival = passenger.Survived === parseInt(survSelect);
            }
            
            let matchesClass = true;
            if (classSelect !== "all") {
                matchesClass = passenger.Pclass === parseInt(classSelect);
            }
            
            let matchesSex = true;
            if (sexSelect !== "all") {
                matchesSex = passenger.Sex === sexSelect;
            }

            return matchesName && matchesSurvival && matchesClass && matchesSex;
        });

        State.t1Pagination.currentPage = 1;
        renderExplorerTable();
    }

    function renderExplorerTable() {
        const { currentPage, pageSize, filteredData } = State.t1Pagination;
        const totalRecords = filteredData.length;
        
        DOM.recordCount.innerText = `Showing ${totalRecords} of ${rawData.length} records`;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalRecords);
        const pagedData = filteredData.slice(startIndex, endIndex);

        DOM.registryTableBody.innerHTML = "";

        if (pagedData.length === 0) {
            DOM.registryTableBody.innerHTML = `
                <tr>
                    <td colspan="11" class="text-center font-bold" style="padding: 30px;">
                        No records match the active filters.
                    </td>
                </tr>`;
            DOM.prevPageBtn.disabled = true;
            DOM.nextPageBtn.disabled = true;
            DOM.pageNumbersContainer.innerHTML = "";
            return;
        }

        pagedData.forEach(p => {
            const survivalBadge = p.Survived === 1 
                ? '<span class="survived-badge survived">Survived</span>' 
                : '<span class="survived-badge deceased">Deceased</span>';
            
            const pclassLabel = p.Pclass === 1 ? '1st' : p.Pclass === 2 ? '2nd' : '3rd';
            const ageDisplay = p.Age !== null ? p.Age.toFixed(1) : '<span class="text-warning font-bold">null</span>';
            const fareDisplay = p.Fare !== null ? `£${p.Fare.toFixed(2)}` : '<span class="text-muted">null</span>';
            const cabinDisplay = p.Cabin !== null ? p.Cabin : '<span class="text-danger font-bold">null</span>';
            const portDisplay = p.Embarked !== null ? p.Embarked : '<span class="text-info font-bold">null</span>';

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><code>${p.PassengerId}</code></td>
                <td>${survivalBadge}</td>
                <td><span class="class-badge">${pclassLabel}</span></td>
                <td class="name-cell">${escapeHTML(p.Name)}</td>
                <td>${p.Sex}</td>
                <td><strong>${ageDisplay}</strong></td>
                <td>${p.SibSp}</td>
                <td>${p.Parch}</td>
                <td>${fareDisplay}</td>
                <td><code>${cabinDisplay}</code></td>
                <td><strong>${portDisplay}</strong></td>
            `;
            DOM.registryTableBody.appendChild(row);
        });

        const totalPages = Math.ceil(totalRecords / pageSize);
        DOM.prevPageBtn.disabled = (currentPage === 1);
        DOM.nextPageBtn.disabled = (currentPage === totalPages || totalPages === 0);

        DOM.pageNumbersContainer.innerHTML = "";
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i < 1) continue;
            const pageNumBtn = document.createElement("button");
            pageNumBtn.className = `page-num ${i === currentPage ? "active" : ""}`;
            pageNumBtn.innerText = i;
            pageNumBtn.addEventListener("click", () => {
                State.t1Pagination.currentPage = i;
                renderExplorerTable();
            });
            DOM.pageNumbersContainer.appendChild(pageNumBtn);
        }
    }

    // Task 1: Bind Controls
    DOM.searchName.addEventListener("input", (e) => {
        State.t1Filters.name = e.target.value;
        filterDataset();
        renderActiveChart();
    });
    DOM.filterSurvived.addEventListener("change", (e) => {
        State.t1Filters.survived = e.target.value;
        filterDataset();
        renderActiveChart();
    });
    DOM.filterPclass.addEventListener("change", (e) => {
        State.t1Filters.pclass = e.target.value;
        filterDataset();
        renderActiveChart();
    });
    DOM.filterSex.addEventListener("change", (e) => {
        State.t1Filters.sex = e.target.value;
        filterDataset();
        renderActiveChart();
    });

    DOM.resetFiltersBtn.addEventListener("click", () => {
        DOM.searchName.value = "";
        DOM.filterSurvived.value = "all";
        DOM.filterPclass.value = "all";
        DOM.filterSex.value = "all";
        State.t1Filters = { name: "", survived: "all", pclass: "all", sex: "all" };
        filterDataset();
        renderActiveChart();
    });

    DOM.prevPageBtn.addEventListener("click", () => {
        if (State.t1Pagination.currentPage > 1) {
            State.t1Pagination.currentPage--;
            renderExplorerTable();
        }
    });
    DOM.nextPageBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(State.t1Pagination.filteredData.length / State.t1Pagination.pageSize);
        if (State.t1Pagination.currentPage < totalPages) {
            State.t1Pagination.currentPage++;
            renderExplorerTable();
        }
    });

    DOM.vizBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            DOM.vizBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            State.t1ActiveViz = btn.getAttribute("data-viz");
            renderActiveChart();
        });
    });

    function renderActiveChart() {
        const activeViz = State.t1ActiveViz;
        DOM.chartBoxes.forEach(box => box.classList.remove("active"));
        const targetBox = document.getElementById(`chart-${activeViz}`);
        if (targetBox) targetBox.classList.add("active");

        const data = State.t1Pagination.filteredData;
        const isDark = DOM.body.classList.contains("dark-theme");
        const textColor = isDark ? "#9ca3af" : "#475569";
        const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)";
        const axisColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(15, 23, 42, 0.2)";

        if (activeViz === "gender-survival") {
            renderGenderSurvivalChart(data, textColor, gridColor, axisColor);
        } else if (activeViz === "class-survival") {
            renderClassSurvivalChart(data, textColor, gridColor, axisColor);
        } else if (activeViz === "missingness") {
            renderMissingnessHeatmap(data, textColor, gridColor, axisColor);
        } else if (activeViz === "age-hist") {
            renderAgeHistogram(data, textColor, gridColor, axisColor);
        }
    }

    // Chart SVG renderings
    function renderGenderSurvivalChart(data, txtColor, gridCol, axisCol) {
        const svg = document.getElementById("svg-gender-survival");
        if (!svg) return;
        svg.innerHTML = "";

        let mTotal = 0, mSurv = 0, fTotal = 0, fSurv = 0;
        data.forEach(p => {
            if (p.Sex === "male") {
                mTotal++;
                if (p.Survived === 1) mSurv++;
            } else if (p.Sex === "female") {
                fTotal++;
                if (p.Survived === 1) fSurv++;
            }
        });

        const mDeceased = mTotal - mSurv;
        const fDeceased = fTotal - fSurv;
        const mSurvRate = mTotal > 0 ? (mSurv / mTotal * 100).toFixed(1) : 0;
        const fSurvRate = fTotal > 0 ? (fSurv / fTotal * 100).toFixed(1) : 0;

        const svgW = 500, svgH = 220;
        const margin = { top: 40, right: 30, bottom: 40, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        const maxVal = Math.max(mSurv, mDeceased, fSurv, fDeceased, 10);
        const yMax = Math.ceil(maxVal / 50) * 50;

        let html = `
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">${yMax}</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">${yMax / 2}</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">PASSENGER COUNT</text>
            <text x="${svgW / 2}" y="20" class="svg-title" fill="${txtColor}" text-anchor="middle">SURVIVAL BY BIOLOGICAL GENDER</text>
        `;

        const groupW = w / 2;
        const barW = 45;
        const padding = 15;

        const createBar = (x, val, isSurv, rateText = "") => {
            const barH = (val / yMax) * h;
            const barY = margin.top + h - barH;
            const barClass = isSurv ? "survived-bar" : "deceased-bar";
            return `
                <rect x="${x}" y="${barY}" width="${barW}" height="${barH}" class="svg-bar ${barClass}" rx="3">
                    <title>${val} passengers (${rateText})</title>
                </rect>
                <text x="${x + barW/2}" y="${barY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${val}</text>
            `;
        };

        const fX = margin.left + groupW/2 - barW - padding/2;
        html += createBar(fX, fSurv, true, `${fSurvRate}% Survived`);
        html += createBar(fX + barW + padding, fDeceased, false, `${(100 - fSurvRate).toFixed(1)}% Deceased`);
        html += `<text x="${fX + barW + padding/2}" y="${margin.top + h + 20}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">FEMALE (${fSurvRate}% Surv)</text>`;

        const mX = margin.left + groupW * 1.5 - barW - padding/2;
        html += createBar(mX, mSurv, true, `${mSurvRate}% Survived`);
        html += createBar(mX + barW + padding, mDeceased, false, `${(100 - mSurvRate).toFixed(1)}% Deceased`);
        html += `<text x="${mX + barW + padding/2}" y="${margin.top + h + 20}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">MALE (${mSurvRate}% Surv)</text>`;

        html += `
            <rect x="${svgW - 130}" y="12" width="10" height="10" fill="#34d399" rx="2"/>
            <text x="${svgW - 115}" y="20" class="svg-text" fill="${txtColor}">Survived</text>
            <rect x="${svgW - 70}" y="12" width="10" height="10" fill="#f87171" rx="2"/>
            <text x="${svgW - 55}" y="20" class="svg-text" fill="${txtColor}">Deceased</text>
        `;

        svg.innerHTML = html;
    }

    function renderClassSurvivalChart(data, txtColor, gridCol, axisCol) {
        const svg = document.getElementById("svg-class-survival");
        if (!svg) return;
        svg.innerHTML = "";

        let c1T = 0, c1S = 0, c2T = 0, c2S = 0, c3T = 0, c3S = 0;
        data.forEach(p => {
            if (p.Pclass === 1) {
                c1T++;
                if (p.Survived === 1) c1S++;
            } else if (p.Pclass === 2) {
                c2T++;
                if (p.Survived === 1) c2S++;
            } else if (p.Pclass === 3) {
                c3T++;
                if (p.Survived === 1) c3S++;
            }
        });

        const c1Rate = c1T > 0 ? (c1S / c1T * 100) : 0;
        const c2Rate = c2T > 0 ? (c2S / c2T * 100) : 0;
        const c3Rate = c3T > 0 ? (c3S / c3T * 100) : 0;

        const rates = [
            { classLabel: "1ST CLASS", rate: c1Rate, total: c1T, surv: c1S, colorClass: "survived-bar" },
            { classLabel: "2ND CLASS", rate: c2Rate, total: c2T, surv: c2S, colorClass: "svg-bar" },
            { classLabel: "3RD CLASS", rate: c3Rate, total: c3T, surv: c3S, colorClass: "deceased-bar" }
        ];

        const svgW = 500, svgH = 220;
        const margin = { top: 40, right: 30, bottom: 40, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">100%</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">50%</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0%</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">SURVIVAL RATE (%)</text>
            <text x="${svgW / 2}" y="20" class="svg-title" fill="${txtColor}" text-anchor="middle">SURVIVAL RATIOS BY PASSENGER CLASS</text>
        `;

        const groupW = w / 3;
        const barW = 50;

        rates.forEach((r, idx) => {
            const barH = (r.rate / 100) * h;
            const barY = margin.top + h - barH;
            const barX = margin.left + (idx * groupW) + (groupW/2) - (barW/2);

            html += `
                <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" class="svg-bar ${r.colorClass}" rx="3">
                    <title>Survival: ${r.rate.toFixed(1)}% (${r.surv}/${r.total})</title>
                </rect>
                <text x="${barX + barW/2}" y="${barY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${r.rate.toFixed(1)}%</text>
                <text x="${barX + barW/2}" y="${margin.top + h + 16}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${r.classLabel}</text>
                <text x="${barX + barW/2}" y="${margin.top + h + 28}" class="svg-text" style="font-size:9px" text-anchor="middle" fill="${txtColor}">${r.surv} / ${r.total} survived</text>
            `;
        });

        svg.innerHTML = html;
    }

    function renderMissingnessHeatmap(data, txtColor, gridCol, axisCol) {
        const svg = document.getElementById("svg-missingness");
        if (!svg) return;
        svg.innerHTML = "";

        if (data.length === 0) return;
        const features = ["PassengerId", "Survived", "Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Cabin", "Embarked"];
        const bins = 20;
        const binSize = Math.ceil(data.length / bins);

        const svgW = 500, svgH = 220;
        const margin = { top: 40, right: 30, bottom: 40, left: 90 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <text x="${svgW / 2}" y="20" class="svg-title" fill="${txtColor}" text-anchor="middle">DATA COMPLETENESS MATRIX MAP (Binned Heatmap)</text>
            <text x="${margin.left + w/2}" y="${svgH - 8}" class="svg-text" fill="${txtColor}" text-anchor="middle">DATASET PROGRESSION (Left to Right)</text>
        `;

        const cellW = w / bins;
        const cellH = h / features.length;

        features.forEach((feat, yIdx) => {
            const y = margin.top + (yIdx * cellH);
            html += `<text x="${margin.left - 8}" y="${y + cellH/2 + 4}" class="svg-text font-bold" text-anchor="end" fill="${txtColor}">${feat}</text>`;

            for (let xIdx = 0; xIdx < bins; xIdx++) {
                const x = margin.left + (xIdx * cellW);
                const startIndex = xIdx * binSize;
                const endIndex = Math.min(startIndex + binSize, data.length);
                const slice = data.slice(startIndex, endIndex);

                let missingCount = 0;
                slice.forEach(p => {
                    if (p[feat] === null || p[feat] === undefined || p[feat] === "" || p[feat] === "Unknown") {
                        missingCount++;
                    }
                });

                const missingPct = slice.length > 0 ? (missingCount / slice.length) : 0;
                let cellColor = "#0d9488";
                if (missingPct > 0.05 && missingPct <= 0.2) {
                    cellColor = "rgba(251, 191, 36, 0.4)";
                } else if (missingPct > 0.2 && missingPct <= 0.7) {
                    cellColor = "rgba(239, 68, 68, 0.4)";
                } else if (missingPct > 0.7) {
                    cellColor = "rgba(239, 68, 68, 0.95)";
                }

                html += `
                    <rect x="${x}" y="${y}" width="${cellW - 1.5}" height="${cellH - 1.5}" fill="${cellColor}" class="svg-missing-cell">
                        <title>${feat} Bin ${xIdx+1}: ${(missingPct * 100).toFixed(0)}% missing (${missingCount} of ${slice.length})</title>
                    </rect>
                `;
            }
        });

        html += `
            <rect x="${svgW - 270}" y="12" width="8" height="8" fill="#0d9488" rx="1"/>
            <text x="${svgW - 258}" y="19" class="svg-text" style="font-size:8px" fill="${txtColor}">0-5% Miss</text>
            <rect x="${svgW - 200}" y="12" width="8" height="8" fill="rgba(251, 191, 36, 0.5)" rx="1"/>
            <text x="${svgW - 188}" y="19" class="svg-text" style="font-size:8px" fill="${txtColor}">5-20% Miss</text>
            <rect x="${svgW - 130}" y="12" width="8" height="8" fill="rgba(239, 68, 68, 0.5)" rx="1"/>
            <text x="${svgW - 118}" y="19" class="svg-text" style="font-size:8px" fill="${txtColor}">20-70% Miss</text>
            <rect x="${svgW - 65}" y="12" width="8" height="8" fill="rgba(239, 68, 68, 0.95)" rx="1"/>
            <text x="${svgW - 53}" y="19" class="svg-text" style="font-size:8px" fill="${txtColor}">>70% Miss</text>
        `;

        svg.innerHTML = html;
    }

    function renderAgeHistogram(data, txtColor, gridCol, axisCol) {
        const svg = document.getElementById("svg-age-hist");
        if (!svg) return;
        svg.innerHTML = "";

        const buckets = Array(8).fill(0);
        const labels = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80"];
        let nullAgeCount = 0;

        data.forEach(p => {
            if (p.Age === null || p.Age === undefined) {
                nullAgeCount++;
            } else {
                const idx = Math.min(Math.floor(p.Age / 10), 7);
                buckets[idx]++;
            }
        });

        const maxVal = Math.max(...buckets, 10);
        const yMax = Math.ceil(maxVal / 20) * 20;

        const svgW = 500, svgH = 220;
        const margin = { top: 40, right: 30, bottom: 40, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">${yMax}</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">${yMax / 2}</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">PASSENGER COUNT</text>
            <text x="${svgW / 2}" y="20" class="svg-title" fill="${txtColor}" text-anchor="middle">PASSENGER AGE PROFILE DISTRIBUTION</text>
            <text x="${svgW - margin.right}" y="32" class="svg-text font-bold" text-anchor="end" fill="${txtColor}">Age missing in filtered: ${nullAgeCount} rows</text>
        `;

        const barW = w / 8;
        buckets.forEach((val, idx) => {
            const barH = (val / yMax) * h;
            const barY = margin.top + h - barH;
            const barX = margin.left + (idx * barW);

            html += `
                <rect x="${barX + 2}" y="${barY}" width="${barW - 4}" height="${barH}" class="svg-bar" fill="#0d9488" rx="2">
                    <title>Age ${labels[idx]} years: ${val} passengers</title>
                </rect>
                <text x="${barX + barW/2}" y="${barY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${val}</text>
                <text x="${barX + barW/2}" y="${margin.top + h + 18}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${labels[idx]}</text>
            `;
        });

        svg.innerHTML = html;
    }

    /* ==========================================================================
       5. Task 2: Data Cleaning Preprocessing Lab
       ========================================================================== */
    function renderPreprocessingLab() {
        const status = State.labCleaningStatus;
        const isDark = DOM.body.classList.contains("dark-theme");
        const textColor = isDark ? "#9ca3af" : "#475569";
        const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)";
        const axisColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(15, 23, 42, 0.2)";

        if (status === "raw") {
            DOM.cleanCompletenessPct.innerText = "91.9%";
            DOM.cleanCompletenessPct.className = "val text-danger";
            DOM.cleanMissingCount.innerText = "866";
            DOM.cleanMissingCount.className = "val text-danger";
            DOM.resetLabBtn.disabled = true;
            DOM.runCleaningBtn.disabled = false;
        } else {
            DOM.cleanCompletenessPct.innerText = "100.0%";
            DOM.cleanCompletenessPct.className = "val text-success";
            DOM.cleanMissingCount.innerText = "0";
            DOM.cleanMissingCount.className = "val text-success";
            DOM.resetLabBtn.disabled = false;
            DOM.runCleaningBtn.disabled = true;
        }

        renderBeforeAfterChart(status, textColor, gridColor, axisColor);
    }

    function renderBeforeAfterChart(status, txtColor, gridCol, axisCol) {
        const svg = document.getElementById("svg-ba-completeness");
        if (!svg) return;
        svg.innerHTML = "";

        const svgW = 500, svgH = 220;
        const margin = { top: 40, right: 30, bottom: 40, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        const ageB = 177, ageA = 0;
        const cabB = 687, cabA = 0;
        const embB = 2, embA = 0;
        const yMax = 700;

        let html = `
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">700</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">350</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">MISSING VALUES COUNT</text>
            <text x="${svgW / 2}" y="20" class="svg-title" fill="${txtColor}" text-anchor="middle">VARIABLE OMISSIONS BEFORE vs. AFTER CLEANING</text>
        `;

        const groupW = w / 3;
        const barW = 40;
        const padding = 6;
        const variables = [
            { label: "AGE", before: ageB, after: ageA },
            { label: "CABIN", before: cabB, after: cabA },
            { label: "EMBARKED", before: embB, after: embA }
        ];

        variables.forEach((v, idx) => {
            const groupX = margin.left + (idx * groupW) + (groupW/2);
            
            const beforeH = (v.before / yMax) * h;
            const beforeY = margin.top + h - beforeH;
            const beforeBarX = groupX - barW - padding/2;

            html += `
                <rect x="${beforeBarX}" y="${beforeY}" width="${barW}" height="${beforeH}" fill="#f87171" rx="2" opacity="0.85">
                    <title>Before: ${v.before} missing</title>
                </rect>
                <text x="${beforeBarX + barW/2}" y="${beforeY - 5}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${v.before}</text>
            `;

            const afterVal = (status === "raw") ? v.before : v.after;
            const afterH = (afterVal / yMax) * h;
            const afterY = margin.top + h - afterH;
            const afterBarX = groupX + padding/2;
            const afterColor = (status === "raw") ? "#f87171" : "#10b981";
            const afterOpacity = (status === "raw") ? "0.85" : "1.0";

            html += `
                <rect x="${afterBarX}" y="${afterY}" width="${barW}" height="${afterH}" fill="${afterColor}" rx="2" opacity="${afterOpacity}">
                    <title>After: ${afterVal} missing</title>
                </rect>
                <text x="${afterBarX + barW/2}" y="${afterY - 5}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${afterVal}</text>
                <text x="${groupX}" y="${margin.top + h + 18}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${v.label}</text>
            `;
        });

        html += `
            <rect x="${svgW - 145}" y="12" width="10" height="10" fill="#f87171" rx="2"/>
            <text x="${svgW - 130}" y="20" class="svg-text" fill="${txtColor}">Before Clean</text>
            <rect x="${svgW - 75}" y="12" width="10" height="10" fill="#10b981" rx="2"/>
            <text x="${svgW - 60}" y="20" class="svg-text" fill="${txtColor}">After Clean</text>
        `;

        svg.innerHTML = html;
    }

    DOM.runCleaningBtn.addEventListener("click", () => {
        DOM.runCleaningBtn.disabled = true;
        DOM.terminalConsole.innerHTML = "";

        const logLines = [
            { text: "$ sh run_titanic_preprocessor.sh", class: "font-bold text-teal" },
            { text: "[Stage 0/5] Initializing Titanic Preprocessing Pipeline...", class: "text-muted" },
            { text: "[Stage 1/5] Loading passenger dataset record manifest: loaded 'titanic.csv'.", class: "" },
            { text: "[Stage 1/5] Running duplicate audit scan: Checked 891 passenger records.", class: "" },
            { text: "   --> Duplicate Search Outcome: 0 duplicate rows detected. Uniqueness locked.", class: "text-success font-bold" },
            { text: "[Stage 2/5] Running missing data audit scan on 891 manifests:", class: "text-muted" },
            { text: "   * Missing Ages detected: 177 counts (19.87% missingness).", class: "" },
            { text: "   * Missing Cabins detected: 687 counts (77.10% missingness).", class: "" },
            { text: "   * Missing Embarkation Ports detected: 2 counts (0.22% missingness).", class: "" },
            { text: "[Stage 2/5] Calculating Imputation Matrices...", class: "text-muted" },
            { text: "   * Outlier-robust median passenger age calculated: 28.0 years.", class: "text-teal" },
            { text: "   * Mode port calculated: Port 'S' (Southampton, frequency=72.4%).", class: "text-teal" },
            { text: "[Stage 2/5] Executing imputations...", class: "text-muted" },
            { text: "   * Imputed 177 missing Ages with median fill (28.0 years). Completed.", class: "" },
            { text: "   * Grouped 687 sparse cabins under categorical class placeholder 'Unknown'. Completed.", class: "" },
            { text: "   * Imputed 2 Embarkation ports with modal port 'S'. Completed.", class: "" },
            { text: "[Stage 3/5] Standardizing numeric type conversions: cast Age and Fare columns to floats.", class: "text-muted" },
            { text: "[Stage 4/5] Running string normalization rules:", class: "text-muted" },
            { text: "   * Trimmed trailing ticket whitespace, stripped quotes from Names.", class: "" },
            { text: "   * Cast all gender cells to lowercase, alphanumeric ticket/cabin values to uppercase.", class: "" },
            { text: "[Stage 5/5] Performing post-preprocessed validations range constraints:", class: "text-muted" },
            { text: "   * Validating Age range bounds (0.0 < Age <= 100.0)... OK.", class: "text-success" },
            { text: "   * Validating Fare range non-negativity (Fare >= £0.00)... OK.", class: "text-success" },
            { text: "   * Validating binary Survived outcomes (Survived in [0, 1])... OK.", class: "text-success" },
            { text: "   --> Validations Complete: 100% data integrity verified. 0 anomalies.", class: "text-success font-bold" },
            { text: "[Stage 5/5] Writing finalized databases...", class: "text-muted" },
            { text: "   * Exported preprocessed CSV: successfully saved 'titanic_clean.csv'.", class: "" },
            { text: "   * Exported preprocessed JS: successfully saved 'titanic_clean_data.js'.", class: "" },
            { text: "PREPROCESSING PIPELINE SUCCESSFULLY COMPLETED - DATA READY!", class: "text-success font-bold" }
        ];

        let lineIdx = 0;
        function printLogLine() {
            if (lineIdx < logLines.length) {
                const line = logLines[lineIdx];
                const div = document.createElement("div");
                div.className = `terminal-line ${line.class || ""}`;
                div.innerText = `> ${line.text}`;
                
                DOM.terminalConsole.appendChild(div);
                DOM.terminalConsole.scrollTop = DOM.terminalConsole.scrollHeight;
                lineIdx++;
                setTimeout(printLogLine, 80);
            } else {
                State.labCleaningStatus = "clean";
                renderPreprocessingLab();
            }
        }
        printLogLine();
    });

    DOM.resetLabBtn.addEventListener("click", () => {
        State.labCleaningStatus = "raw";
        DOM.terminalConsole.innerHTML = `
            <div class="terminal-line text-muted">&gt; System initialized. Preprocessing script ready for execution.</div>
            <div class="terminal-line text-muted">&gt; Standing by... Click 'Run Preprocessing Pipeline' above to start cleaning.</div>
        `;
        renderPreprocessingLab();
    });

    /* ==========================================================================
       6. Task 3: Exploratory Data Analysis (EDA) Laboratory
       ========================================================================== */
    function renderEDALaboratory() {
        const activeViz = State.t3ActiveViz;
        const isDark = DOM.body.classList.contains("dark-theme");
        const txtColor = isDark ? "#9ca3af" : "#475569";
        const gridCol = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)";
        const axisCol = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(15, 23, 42, 0.2)";

        // Set active switches classes
        DOM.edaBtns.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-eda") === activeViz);
        });

        // Clear and draw SVG
        DOM.svgEDALab.innerHTML = "";

        if (activeViz === "age-hist-density") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-chart-area"></i> Age Profile & Normal Density curve';
            DOM.edaChartSubtitleIndicator.innerText = "Cleaned Manifest Age Profile Bucket Histograms vs. Standard Normal Distribution";
            drawAgeDensityChart(txtColor, gridCol, axisCol);
        } else if (activeViz === "gender-donut") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-chart-pie"></i> Gender Manifest shares';
            DOM.edaChartSubtitleIndicator.innerText = "Donut Path representation of Passenger Biological Gender Ratios";
            drawDonutChart("Sex", ["male", "female"], ["#38bdf8", "#f87171"], ["Male", "Female"], txtColor);
        } else if (activeViz === "pclass-donut") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-chart-pie"></i> Socio-economic Class shares';
            DOM.edaChartSubtitleIndicator.innerText = "Donut Path representation of Passenger Ticket Class Shares";
            drawDonutChart("Pclass", [1, 2, 3], ["#34d399", "#38bdf8", "#fbbf24"], ["1st Class", "2nd Class", "3rd Class"], txtColor);
        } else if (activeViz === "surv-donut") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-chart-pie"></i> Overall Survival Ratio';
            DOM.edaChartSubtitleIndicator.innerText = "Donut Path representation of Deceased vs. Survived Passenger Ratios";
            drawDonutChart("Survived", [0, 1], ["#f87171", "#34d399"], ["Deceased (0)", "Survived (1)"], txtColor);
        } else if (activeViz === "surv-gender-bar") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-chart-column"></i> Survival vs. Gender Rates';
            DOM.edaChartSubtitleIndicator.innerText = "Bivariate grouped representation of Survival probability across Genders";
            drawSurvivalBivariateSex(txtColor, gridCol, axisCol);
        } else if (activeViz === "surv-pclass-bar") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-chart-column"></i> Survival vs. Ticket Class Rates';
            DOM.edaChartSubtitleIndicator.innerText = "Bivariate representation of Survival probability across Pclasses";
            drawSurvivalBivariateClass(txtColor, gridCol, axisCol);
        } else if (activeViz === "fare-boxplot") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-sliders"></i> Fare Outlier Audits Boxplot';
            DOM.edaChartSubtitleIndicator.innerText = "Interquartile Range (IQR) bounds vs. High-Value suite Outlier plots";
            drawFareBoxplot(txtColor, gridCol, axisCol);
        } else if (activeViz === "corr-heatmap") {
            DOM.edaChartTitleIndicator.innerHTML = '<i class="fa-solid fa-border-all"></i> Pearson Correlation Coefficient Heatmap';
            DOM.edaChartSubtitleIndicator.innerText = "6x6 linear relationship coordinate matrix among numerical columns";
            drawCorrelationHeatmap(txtColor);
        }
    }

    // Task 3: Bind switches
    DOM.edaBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            State.t3ActiveViz = btn.getAttribute("data-eda");
            renderEDALaboratory();
        });
    });

    // Drawing Dynamic Donut Charts (Polar Coordinates segment arrays)
    function drawDonutChart(fieldName, categories, colors, labels, txtColor) {
        const svg = DOM.svgEDALab;
        const totalCount = cleanData.length;
        if (totalCount === 0) return;

        // Calculate segment angles
        const segments = categories.map(cat => {
            const count = cleanData.filter(p => p[fieldName] === cat).length;
            return {
                value: count,
                pct: count / totalCount,
                angle: (count / totalCount) * 360
            };
        });

        const svgW = 600, svgH = 360;
        const cx = 220, cy = 180;
        const rOuter = 100, rInner = 60;

        let html = "";
        let startAngle = 0;

        // Draw sectors
        segments.forEach((s, idx) => {
            if (s.value === 0) return;
            const endAngle = startAngle + s.angle;
            
            // Polar conversion coordinates helper
            const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
                const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                return {
                    x: centerX + (radius * Math.cos(angleInRadians)),
                    y: centerY + (radius * Math.sin(angleInRadians))
                };
            };

            const startOuter = polarToCartesian(cx, cy, rOuter, startAngle);
            const endOuter = polarToCartesian(cx, cy, rOuter, endAngle);
            const startInner = polarToCartesian(cx, cy, rInner, startAngle);
            const endInner = polarToCartesian(cx, cy, rInner, endAngle);

            const largeArcFlag = s.angle > 180 ? 1 : 0;

            const pathData = [
                `M ${startOuter.x} ${startOuter.y}`,
                `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
                `L ${endInner.x} ${endInner.y}`,
                `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
                "Z"
            ].join(" ");

            html += `
                <path d="${pathData}" fill="${colors[idx]}" class="svg-pie-segment">
                    <title>${labels[idx]}: ${s.value} passengers (${(s.pct * 100).toFixed(1)}%)</title>
                </path>
            `;

            // Draw text tag in center of slice if slice is large enough
            const midAngle = startAngle + s.angle / 2;
            const midPt = polarToCartesian(cx, cy, (rOuter + rInner)/2 + 2, midAngle);
            if (s.pct > 0.08) {
                html += `
                    <text x="${midPt.x}" y="${midPt.y + 4}" class="svg-text font-bold" text-anchor="middle" fill="#000" style="font-size:9px">${(s.pct * 100).toFixed(0)}%</text>
                `;
            }

            startAngle = endAngle;
        });

        // Draw Legends on the Right Side
        const legendX = 390;
        const legendStartY = 120;
        const legendSpacing = 30;

        segments.forEach((s, idx) => {
            const legendY = legendStartY + idx * legendSpacing;
            html += `
                <rect x="${legendX}" y="${legendY}" width="15" height="15" fill="${colors[idx]}" rx="3"/>
                <text x="${legendX + 24}" y="${legendY + 12}" class="svg-text font-bold" fill="${txtColor}" style="font-size:11px">${labels[idx]}</text>
                <text x="${legendX + 150}" y="${legendY + 12}" class="svg-text font-mono" fill="${txtColor}" text-anchor="end" style="font-size:11px">${s.value} (${(s.pct * 100).toFixed(1)}%)</text>
            `;
        });

        // Middle Total Count Overlay
        html += `
            <circle cx="${cx}" cy="${cy}" r="${rInner - 2}" fill="var(--bg-glass)"/>
            <text x="${cx}" y="${cy - 8}" class="svg-text font-bold" fill="${txtColor}" text-anchor="middle" style="font-size:10px">TOTAL</text>
            <text x="${cx}" y="${cy + 12}" class="svg-text font-mono font-bold" fill="${txtColor}" text-anchor="middle" style="font-size:18px">${totalCount}</text>
        `;

        svg.innerHTML = html;
    }

    // Univariate Age Histogram with standard bell density curve overlay
    function drawAgeDensityChart(txtColor, gridCol, axisCol) {
        const svg = DOM.svgEDALab;
        const buckets = Array(8).fill(0);
        const labels = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80"];
        
        cleanData.forEach(p => {
            if (p.Age !== null) {
                const idx = Math.min(Math.floor(p.Age / 10), 7);
                buckets[idx]++;
            }
        });

        const maxVal = Math.max(...buckets, 10);
        const yMax = Math.ceil(maxVal / 50) * 50;

        const svgW = 600, svgH = 360;
        const margin = { top: 50, right: 30, bottom: 50, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <!-- Grid Lines -->
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>

            <!-- Y Axis -->
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">${yMax}</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">${yMax / 2}</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">PASSENGER COUNT</text>
        `;

        const barW = w / 8;
        buckets.forEach((val, idx) => {
            const barH = (val / yMax) * h;
            const barY = margin.top + h - barH;
            const barX = margin.left + (idx * barW);

            html += `
                <rect x="${barX + 3}" y="${barY}" width="${barW - 6}" height="${barH}" fill="rgba(45, 212, 191, 0.45)" stroke="var(--accent-teal)" stroke-width="1" rx="2" class="svg-bar">
                    <title>Age ${labels[idx]}: ${val} passengers</title>
                </rect>
                <text x="${barX + barW/2}" y="${barY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${val}</text>
                <text x="${barX + barW/2}" y="${margin.top + h + 18}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${labels[idx]}</text>
            `;
        });

        // Overlay standard normal distribution curve overlay path
        // Mean = 29.36, StdDev = 13.02
        // We evaluate normal distribution function at points along the X axis and scale it to fit
        const points = [];
        const mean = 29.36;
        const stdDev = 13.02;
        
        // Scale factor: Normal curve max probability evaluated at mean is 1 / (stdDev * sqrt(2pi)) = ~0.03
        // In our chart, the maximum value bucket (20-30 years) is around 397 rows.
        // We scale normal distribution values so it overlays beautifully.
        const scaleVal = yMax * 7.5; 

        for (let age = 0; age <= 80; age += 2) {
            const exponent = -((age - mean) ** 2) / (2 * (stdDev ** 2));
            const yNormal = (1.0 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
            
            // Map age coordinates to SVG X coordinates
            const xCoord = margin.left + (age / 80) * w;
            
            // Map normal density values to Y coordinates
            const scaledY = yNormal * scaleVal;
            const yCoord = margin.top + h - (scaledY / yMax) * h;
            points.push(`${xCoord},${yCoord}`);
        }

        const pathD = `M ${points.join(" L ")}`;
        html += `
            <path d="${pathD}" fill="none" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-dasharray="2" style="filter: drop-shadow(0 0 2px var(--accent-cyan))">
                <title>Theoretical Normal Curve Overlay (μ=29.36, σ=13.02)</title>
            </path>
            
            <!-- Curve Legend -->
            <line x1="${svgW - 200}" y1="18" x2="${svgW - 160}" y2="18" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-dasharray="2"/>
            <text x="${svgW - 150}" y="22" class="svg-text font-bold" fill="${txtColor}">Normal Curve (Gaussian)</text>
        `;

        svg.innerHTML = html;
    }

    // Bivariate grouped bar survival rates by gender
    function drawSurvivalBivariateSex(txtColor, gridCol, axisCol) {
        const svg = DOM.svgEDALab;
        
        // Bivariate counts
        const fSurv = 233, fTot = 314;
        const mSurv = 109, mTot = 577;

        const fRate = (fSurv / fTot) * 100;
        const mRate = (mSurv / mTot) * 100;

        const svgW = 600, svgH = 360;
        const margin = { top: 50, right: 30, bottom: 50, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <!-- Grid Lines -->
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>

            <!-- Y Axis -->
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">100%</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">50%</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0%</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">SURVIVAL PROBABILITY (%)</text>
        `;

        const groupW = w / 2;
        const barW = 50;
        const padding = 10;

        // Female bars
        const fX = margin.left + groupW/2 - barW - padding/2;
        const fBarH = (fRate / 100) * h;
        const fBarY = margin.top + h - fBarH;

        html += `
            <!-- Female Survived (74.20%) -->
            <rect x="${fX}" y="${fBarY}" width="${barW}" height="${fBarH}" fill="var(--color-success)" rx="3" class="svg-bar">
                <title>Females: ${fSurv} survived out of ${fTot} (${fRate.toFixed(1)}%)</title>
            </rect>
            <text x="${fX + barW/2}" y="${fBarY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${fRate.toFixed(1)}%</text>
            
            <!-- Female Deceased (25.80%) -->
            <rect x="${fX + barW + padding}" y="${margin.top + fBarH}" width="${barW}" height="${h - fBarH}" fill="var(--color-danger)" rx="3" class="svg-bar">
                <title>Females Deceased: ${fTot - fSurv} passengers (${(100 - fRate).toFixed(1)}%)</title>
            </rect>
            <text x="${fX + barW*1.5 + padding}" y="${margin.top + fBarH - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${(100 - fRate).toFixed(1)}%</text>

            <text x="${fX + barW + padding/2}" y="${margin.top + h + 18}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">FEMALE (74.2% Surv)</text>
            <text x="${fX + barW + padding/2}" y="${margin.top + h + 30}" class="svg-text text-muted" text-anchor="middle" style="font-size:9px">${fSurv} of ${fTot} survived</text>
        `;

        // Male bars
        const mX = margin.left + groupW*1.5 - barW - padding/2;
        const mBarH = (mRate / 100) * h;
        const mBarY = margin.top + h - mBarH;

        html += `
            <!-- Male Survived (18.89%) -->
            <rect x="${mX}" y="${mBarY}" width="${barW}" height="${mBarH}" fill="var(--color-success)" rx="3" class="svg-bar">
                <title>Males: ${mSurv} survived out of ${mTot} (${mRate.toFixed(1)}%)</title>
            </rect>
            <text x="${mX + barW/2}" y="${mBarY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${mRate.toFixed(1)}%</text>
            
            <!-- Male Deceased (81.11%) -->
            <rect x="${mX + barW + padding}" y="${margin.top + mBarH}" width="${barW}" height="${h - mBarH}" fill="var(--color-danger)" rx="3" class="svg-bar">
                <title>Males Deceased: ${mTot - mSurv} passengers (${(100 - mRate).toFixed(1)}%)</title>
            </rect>
            <text x="${mX + barW*1.5 + padding}" y="${margin.top + mBarH - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${(100 - mRate).toFixed(1)}%</text>

            <text x="${mX + barW + padding/2}" y="${margin.top + h + 18}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">MALE (18.9% Surv)</text>
            <text x="${mX + barW + padding/2}" y="${margin.top + h + 30}" class="svg-text text-muted" text-anchor="middle" style="font-size:9px">${mSurv} of ${mTot} survived</text>
        `;

        // Legends
        html += `
            <rect x="${svgW - 130}" y="12" width="10" height="10" fill="var(--color-success)" rx="2"/>
            <text x="${svgW - 115}" y="20" class="svg-text" fill="${txtColor}">Survived %</text>
            
            <rect x="${svgW - 70}" y="12" width="10" height="10" fill="var(--color-danger)" rx="2"/>
            <text x="${svgW - 55}" y="20" class="svg-text" fill="${txtColor}">Deceased %</text>
        `;

        svg.innerHTML = html;
    }

    // Bivariate grouped bar survival rates by passenger class
    function drawSurvivalBivariateClass(txtColor, gridCol, axisCol) {
        const svg = DOM.svgEDALab;
        
        // Pclass Bivariate Rates
        const classes = [
            { label: "1ST CLASS", surv: 136, tot: 216, rate: 62.96 },
            { label: "2ND CLASS", surv: 87, tot: 184, rate: 47.28 },
            { label: "3RD CLASS", surv: 119, tot: 491, rate: 24.24 }
        ];

        const svgW = 600, svgH = 360;
        const margin = { top: 50, right: 30, bottom: 50, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <!-- Grid Lines -->
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>

            <!-- Y Axis -->
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">100%</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">50%</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">0%</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">SURVIVAL PROBABILITY (%)</text>
        `;

        const groupW = w / 3;
        const barW = 40;
        const padding = 6;

        classes.forEach((c, idx) => {
            const groupX = margin.left + (idx * groupW) + (groupW/2);
            
            // Survived Bar (Teal/Green)
            const sBarH = (c.rate / 100) * h;
            const sBarY = margin.top + h - sBarH;
            const sBarX = groupX - barW - padding/2;

            html += `
                <rect x="${sBarX}" y="${sBarY}" width="${barW}" height="${sBarH}" fill="var(--color-success)" rx="3" class="svg-bar">
                    <title>${c.label}: ${c.surv} survived out of ${c.tot} (${c.rate.toFixed(1)}%)</title>
                </rect>
                <text x="${sBarX + barW/2}" y="${sBarY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${c.rate.toFixed(1)}%</text>
            `;

            // Deceased Bar (Red)
            const dBarX = groupX + padding/2;
            const dBarH = h - sBarH;
            const dBarY = margin.top + sBarH;

            html += `
                <rect x="${dBarX}" y="${dBarY}" width="${barW}" height="${dBarH}" fill="var(--color-danger)" rx="3" class="svg-bar">
                    <title>${c.label} Deceased: ${c.tot - c.surv} passengers (${(100 - c.rate).toFixed(1)}%)</title>
                </rect>
                <text x="${dBarX + barW/2}" y="${dBarY - 6}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${(100 - c.rate).toFixed(1)}%</text>
                
                <text x="${groupX}" y="${margin.top + h + 18}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${c.label}</text>
                <text x="${groupX}" y="${margin.top + h + 30}" class="svg-text text-muted" text-anchor="middle" style="font-size:9px">${c.surv} of ${c.tot} survived</text>
            `;
        });

        // Legends
        html += `
            <rect x="${svgW - 130}" y="12" width="10" height="10" fill="var(--color-success)" rx="2"/>
            <text x="${svgW - 115}" y="20" class="svg-text" fill="${txtColor}">Survived %</text>
            
            <rect x="${svgW - 70}" y="12" width="10" height="10" fill="var(--color-danger)" rx="2"/>
            <text x="${svgW - 55}" y="20" class="svg-text" fill="${txtColor}">Deceased %</text>
        `;

        svg.innerHTML = html;
    }

    // Boxplot visualizing Fare distributions vs. Survival status
    function drawFareBoxplot(txtColor, gridCol, axisCol) {
        const svg = DOM.svgEDALab;
        
        // Mathematical stats calculated for Fares:
        // Survived = 0: Q1=7.89, Median=10.5, Q3=26.0, Min=0.0, UpperWhisker=53.1 (Outliers: >53.1)
        // Survived = 1: Q1=12.4, Median=26.0, Q3=57.0, Min=0.0, UpperWhisker=120.0 (Outliers: >120.0)
        // We will plot the two Boxplots side-by-side. 
        // Maximum Fare is £512.33, so we use a non-linear log-like visual scale or limit display to £150 to show box details,
        // and plot extreme outliers with high coordinate offsets!
        
        const svgW = 600, svgH = 360;
        const margin = { top: 50, right: 30, bottom: 50, left: 60 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        // Custom scale to fit Fares up to 150 cleanly, and clip/compress everything above 150
        const yMax = 150;
        const getSvgY = (fareVal) => {
            const clamped = Math.min(fareVal, 150);
            return margin.top + h - (clamped / yMax) * h;
        };

        let html = `
            <!-- Grid Lines -->
            <line x1="${margin.left}" y1="${margin.top}" x2="${svgW - margin.right}" y2="${margin.top}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h/2}" x2="${svgW - margin.right}" y2="${margin.top + h/2}" stroke="${gridCol}" stroke-dasharray="3"/>
            <line x1="${margin.left}" y1="${margin.top + h}" x2="${svgW - margin.right}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + h}" stroke="${axisCol}" stroke-width="1.5"/>

            <!-- Y Axis -->
            <text x="${margin.left - 10}" y="${margin.top + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">£150+</text>
            <text x="${margin.left - 10}" y="${margin.top + h/2 + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">£75</text>
            <text x="${margin.left - 10}" y="${margin.top + h + 4}" class="svg-text" text-anchor="end" fill="${txtColor}">£0</text>
            <text x="15" y="${margin.top + h/2}" class="svg-text" fill="${txtColor}" transform="rotate(-90 15 ${margin.top+h/2})" text-anchor="middle">TICKET FARE PRICE Paid (£ GBP)</text>
        `;

        // Boxplot datasets
        const boxData = [
            {
                label: "DECEASED (0)",
                min: 0.0, q1: 7.89, median: 10.5, q3: 26.0, maxWhisker: 53.1,
                outliers: [56.49, 61.17, 69.55, 73.5, 78.85, 82.17, 108.9, 146.52, 263.0]
            },
            {
                label: "SURVIVED (1)",
                min: 0.0, q1: 12.475, median: 26.0, q3: 57.0, maxWhisker: 120.0,
                outliers: [133.65, 146.52, 151.55, 164.86, 211.33, 227.52, 247.52, 262.37, 263.0, 512.32]
            }
        ];

        const groupW = w / 2;
        const boxW = 80;

        boxData.forEach((box, idx) => {
            const cx = margin.left + (idx * groupW) + (groupW / 2);
            
            const yMin = getSvgY(box.min);
            const yQ1 = getSvgY(box.q1);
            const yMedian = getSvgY(box.median);
            const yQ3 = getSvgY(box.q3);
            const yMaxWhisker = getSvgY(box.maxWhisker);

            // Draw Whiskers
            html += `
                <!-- Whisker Lines -->
                <line x1="${cx}" y1="${yMin}" x2="${cx}" y2="${yQ1}" class="svg-boxplot-line" stroke-dasharray="3"/>
                <line x1="${cx}" y1="${yQ3}" x2="${cx}" y2="${yMaxWhisker}" class="svg-boxplot-line" stroke-dasharray="3"/>
                
                <!-- Whisker Caps -->
                <line x1="${cx - boxW/4}" y1="${yMin}" x2="${cx + boxW/4}" y2="${yMin}" class="svg-boxplot-line"/>
                <line x1="${cx - boxW/4}" y1="${yMaxWhisker}" x2="${cx + boxW/4}" y2="${yMaxWhisker}" class="svg-boxplot-line"/>
            `;

            // Draw Box
            html += `
                <rect x="${cx - boxW/2}" y="${yQ3}" width="${boxW}" height="${yQ1 - yQ3}" class="svg-boxplot-rect" rx="2">
                    <title>${box.label}: Q1=£${box.q1.toFixed(2)}, Median=£${box.median.toFixed(2)}, Q3=£${box.q3.toFixed(2)}</title>
                </rect>
                
                <!-- Median Line -->
                <line x1="${cx - boxW/2}" y1="${yMedian}" x2="${cx + boxW/2}" y2="${yMedian}" class="svg-boxplot-line median-line"/>
            `;

            // Draw Outliers (Plotting scattered red dots above upper whisker threshold)
            box.outliers.forEach((out, oIdx) => {
                const outY = getSvgY(out);
                // Jitter outlier dots slightly on X axis to avoid overlapping
                const jitterX = cx + (oIdx % 3 - 1) * 10;
                html += `
                    <circle cx="${jitterX}" cy="${outY}" r="4" class="svg-outlier-dot">
                        <title>Outlier: £${out.toFixed(2)}</title>
                    </circle>
                `;
            });

            // Labels
            html += `
                <text x="${cx}" y="${margin.top + h + 20}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${box.label}</text>
                <text x="${cx}" y="${margin.top + h + 32}" class="svg-text text-muted" text-anchor="middle" style="font-size:9px">Median: £${box.median.toFixed(2)} | Outliers: ${box.outliers.length}</text>
            `;
        });

        svg.innerHTML = html;
    }

    // Pearson Correlation Matrix Heatmap ($6 \times 6$ tile grid)
    function drawCorrelationHeatmap(txtColor) {
        const svg = DOM.svgEDALab;
        
        // 6 variables: Survived, Pclass, Age, SibSp, Parch, Fare
        const fields = ["Survived", "Pclass", "Age", "SibSp", "Parch", "Fare"];
        
        // Pearson coefficients Matrix
        const corr = {
            "Survived": { "Survived": 1.0, "Pclass": -0.3385, "Age": -0.0649, "SibSp": -0.0353, "Parch": 0.0816, "Fare": 0.2573 },
            "Pclass":   { "Survived": -0.3385, "Pclass": 1.0, "Age": -0.3399, "SibSp": 0.0831, "Parch": 0.0184, "Fare": -0.5495 },
            "Age":      { "Survived": -0.0649, "Pclass": -0.3399, "Age": 1.0, "SibSp": -0.2333, "Parch": -0.1725, "Fare": 0.0967 },
            "SibSp":    { "Survived": -0.0353, "Pclass": 0.0831, "Age": -0.2333, "SibSp": 1.0, "Parch": 0.4148, "Fare": 0.1597 },
            "Parch":    { "Survived": 0.0816, "Pclass": 0.0184, "Age": -0.1725, "SibSp": 0.4148, "Parch": 1.0, "Fare": 0.2162 },
            "Fare":     { "Survived": 0.2573, "Pclass": -0.5495, "Age": 0.0967, "SibSp": 0.1597, "Parch": 0.2162, "Fare": 1.0 }
        };

        const svgW = 600, svgH = 360;
        const margin = { top: 50, right: 30, bottom: 40, left: 100 };
        const w = svgW - margin.left - margin.right;
        const h = svgH - margin.top - margin.bottom;

        let html = `
            <text x="${svgW - margin.right}" y="${margin.top - 12}" class="svg-text" style="font-size:9px" fill="${txtColor}" text-anchor="end">Blue: Positive (+) | Red: Negative (-)</text>
        `;

        const cellW = w / 6;
        const cellH = h / 6;

        // Loop rows (Y)
        fields.forEach((f1, yIdx) => {
            const y = margin.top + (yIdx * cellH);
            
            // Y Label
            html += `<text x="${margin.left - 8}" y="${y + cellH/2 + 4}" class="svg-text font-bold" text-anchor="end" fill="${txtColor}">${f1}</text>`;
            
            // X Label (draw top)
            html += `<text x="${margin.left + (yIdx * cellW) + cellW/2}" y="${margin.top - 8}" class="svg-text font-bold" text-anchor="middle" fill="${txtColor}">${f1}</text>`;

            // Loop columns (X)
            fields.forEach((f2, xIdx) => {
                const x = margin.left + (xIdx * cellW);
                const coef = corr[f1][f2];
                
                // Color mapping: positive (cyan/blue), negative (red/orange)
                let cellColor = "rgba(0,0,0,0.02)";
                if (coef > 0) {
                    // Positive correlation (teal-cyan)
                    cellColor = `rgba(56, 189, 248, ${coef * 0.95})`;
                } else if (coef < 0) {
                    // Negative correlation (red-orange)
                    cellColor = `rgba(248, 113, 113, ${Math.abs(coef) * 0.95})`;
                }
                
                // Text color: use black for dark background cells, text color for light ones
                const textCol = Math.abs(coef) > 0.45 ? "#000" : txtColor;

                html += `
                    <rect x="${x}" y="${y}" width="${cellW - 2}" height="${cellH - 2}" fill="${cellColor}" class="svg-correlation-cell" rx="3">
                        <title>Correlation [${f1} vs ${f2}]: ${coef.toFixed(4)}</title>
                    </rect>
                    <text x="${x + cellW/2}" y="${y + cellH/2 + 4}" class="svg-text font-mono font-bold" text-anchor="middle" fill="${textCol}">${coef.toFixed(2)}</text>
                `;
            });
        });

        svg.innerHTML = html;
    }

    /* ==========================================================================
       7. Technical Report TOC Active Highlighter
       ========================================================================== */
    function highlightTOC() {
        const isT1 = (State.currentTask === "task1");
        const isT2 = (State.currentTask === "task2");
        const isT3 = (State.currentTask === "task3");
        
        const sections = isT1 
            ? document.querySelectorAll("#task1-report-body .report-section") 
            : isT2
            ? document.querySelectorAll("#task2-report-body .report-section")
            : isT3
            ? document.querySelectorAll("#task3-report-body .report-section")
            : document.querySelectorAll("#task4-report-body .report-section");
        
        const links = isT1 
            ? DOM.task1ReportToc.querySelectorAll(".toc-link") 
            : isT2
            ? DOM.task2ReportToc.querySelectorAll(".toc-link")
            : isT3
            ? DOM.task3ReportToc.querySelectorAll(".toc-link")
            : DOM.task4ReportToc.querySelectorAll(".toc-link");

        if (State.activeTab !== "report-tab") return;
        
        let activeSectionId = "";
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                activeSectionId = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeSectionId}`);
        });
    }

    window.addEventListener("scroll", highlightTOC);

    DOM.tocLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 85;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                const isT1 = (State.currentTask === "task1");
                const isT2 = (State.currentTask === "task2");
                const isT3 = (State.currentTask === "task3");
                const links = isT1 
                    ? DOM.task1ReportToc.querySelectorAll(".toc-link") 
                    : isT2
                    ? DOM.task2ReportToc.querySelectorAll(".toc-link")
                    : isT3
                    ? DOM.task3ReportToc.querySelectorAll(".toc-link")
                    : DOM.task4ReportToc.querySelectorAll(".toc-link");
                
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });

    /* ==========================================================================
       8. Helper Utilities
       ========================================================================== */
    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* ==========================================================================
       6. Task 4: Data Storytelling Guided Tour Dashboard
       ========================================================================== */
    const TourChapters = [
        {
            title: "The Passenger Baseline",
            text: "Our data journey begins by mapping the Titanic's passenger demographics baseline ($N = 891$ observed passengers). Visualizing these factors reveals a stark reality: early 20th-century travel was heavily dominated by young working-age adults (20–40 years), with biological males making up a massive **64.76%** majority (577 passengers) vs. females at **35.24%** (314 passengers). Furthermore, third-class emigrants represented a **55.11%** (491 passengers) social majority aboard, traveling under deep economic divides.",
            highlights: ["gender", "class"]
        },
        {
            title: "Humanitarian Priorities (\"Women and Children First\")",
            text: "When disaster struck in the icy waters of the North Atlantic, emergency rescue protocols overrode standard operations. The data shows a strict, structured protective protocol: females achieved an incredible **74.20% survival rate** (233 survived out of 314) vs. only **18.89%** for males (109 survived out of 577). Concurrently, youth was heavily prioritized — children under 12 overall achieved a **57.35% survival rate** (39/68), with infants under 5 peaking at **67.50%** (27/40) survival. Adults dropped to **36.82%**, while seniors over 60 were highly vulnerable at **26.92%**.",
            highlights: ["survival", "gender", "age"]
        },
        {
            title: "Socioeconomic Barriers & Premium Outliers",
            text: "Survival was also heavily dictated by socioeconomic partitioning and cabin deck placement. Class 1 (Upper Class) passengers enjoyed a **62.96% survival rate** (136/216) compared to a dismal **24.24%** for Class 3 (119/491) passengers. Evaluating ticket costs (`Fare`) reveals extreme divides: the median Class 1 ticket cost **£60.29** — over **7.5 times** higher than Class 3's median of **£8.05**. The boxplot isolates **116 extreme fare outliers** extending up to **£512.33**, representing luxury multi-cabin suites.",
            highlights: ["class", "fare"]
        },
        {
            title: "Core Statistical Relationships",
            text: "Finally, to mathematically model passenger survival, we visualize our 6x6 Pearson Correlation Heatmap. The grid highlights that socioeconomic standing (`Pclass` vs. Survived: **-0.3385**) and wealth (`Fare` vs. Survived: **0.2573**) represent the strongest linear relationships to survival. The weak near-zero correlation of Age ($r = -0.0649$) demonstrates the non-linear priorities (both infants and elderly had low/high extremes). The strong negative correlation between Pclass and Fare ($r = -0.5495$) alerts data scientists to potential multicollinearity when training classifiers.",
            highlights: ["correlation"]
        }
    ];

    function renderStorytellingDashboard() {
        const activeIdx = State.t4ActiveChapter - 1;
        const chapter = TourChapters[activeIdx];

        // 1. Update Stepper narration HTML
        DOM.tourProgressIndicator.innerText = `Chapter ${State.t4ActiveChapter} of 4`;
        DOM.tourChapterTitle.innerText = chapter.title;
        DOM.tourChapterText.innerHTML = chapter.text;

        DOM.tourPrevBtn.disabled = (State.t4ActiveChapter === 1);
        DOM.tourNextBtn.disabled = (State.t4ActiveChapter === 4);

        // 2. Clear previous dashboard highlights
        const allDbBoxes = document.querySelectorAll(".dashboard-chart-box");
        allDbBoxes.forEach(box => box.classList.remove("dashboard-highlight"));

        // 3. Highlight relevant panels for the active chapter
        chapter.highlights.forEach(h => {
            const panel = document.getElementById(`db-panel-${h}`);
            if (panel) panel.classList.add("dashboard-highlight");
        });

        // 4. Render all 6 SVG canvases
        const isDark = DOM.body.classList.contains("dark-theme");
        const textColHex = isDark ? "#e2e8f0" : "#0f172a";
        const gridColHex = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)";
        const axisColHex = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.15)";

        renderStorySurvivalGauge(textColHex);
        renderStoryGenderDonut(textColHex);
        renderStoryClassColumns(textColHex, gridColHex, axisColHex);
        renderStoryFareBoxplots(textColHex, gridColHex, axisColHex);
        renderStoryAgeColumns(textColHex, gridColHex, axisColHex);
        renderStoryCorrelationHeatmap(textColHex);
    }

    // --- Dynamic SVG Storytelling Renderers ---
    function renderStorySurvivalGauge(textCol) {
        const svg = document.getElementById("svg-story-survival");
        if (!svg) return;
        
        svg.innerHTML = `
            <defs>
                <linearGradient id="teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0d9488" />
                    <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
            </defs>
            <!-- Gauge background circle -->
            <circle cx="100" cy="85" r="45" class="svg-story-gauge-bg"/>
            <!-- Gauge foreground circle representing 38.38% survival -->
            <circle cx="100" cy="85" r="45" class="svg-story-gauge-fill"
                    stroke-dasharray="282.74" stroke-dashoffset="174.22"
                    transform="rotate(-90 100 85)"/>
            <!-- Value texts -->
            <text x="100" y="85" font-family="var(--font-serif)" font-weight="bold" font-size="16" text-anchor="middle" fill="${textCol}">38.38%</text>
            <text x="100" y="100" font-family="var(--font-sans)" font-size="8" text-anchor="middle" fill="${textCol}">SURVIVED</text>
            <text x="100" y="112" font-family="var(--font-sans)" font-size="6" text-anchor="middle" class="text-muted">(342 of 891)</text>
        `;
    }

    function renderStoryGenderDonut(textCol) {
        const svg = document.getElementById("svg-story-gender");
        if (!svg) return;

        svg.innerHTML = `
            <!-- Female Donut Arc (35.24%) -->
            <circle cx="100" cy="85" r="45" fill="none" stroke="#0d9488" stroke-width="12"
                    stroke-dasharray="282.74" stroke-dashoffset="0" />
            <!-- Male Donut Arc (64.76%) -->
            <circle cx="100" cy="85" r="45" fill="none" stroke="#475569" stroke-width="12"
                    stroke-dasharray="282.74" stroke-dashoffset="-99.6" />
            <!-- Legend and Values -->
            <text x="100" y="85" font-family="var(--font-serif)" font-weight="bold" font-size="14" text-anchor="middle" fill="${textCol}">N = 891</text>
            <text x="100" y="98" font-family="var(--font-sans)" font-size="8" text-anchor="middle" fill="${textCol}">PASSENGERS</text>
            
            <rect x="25" y="142" width="6" height="6" fill="#0d9488" rx="1"/>
            <text x="35" y="148" class="svg-story-text" style="font-size:7px" fill="${textCol}">Female (35%)</text>
            
            <rect x="110" y="142" width="6" height="6" fill="#475569" rx="1"/>
            <text x="120" y="148" class="svg-story-text" style="font-size:7px" fill="${textCol}">Male (65%)</text>
        `;
    }

    function renderStoryClassColumns(textCol, gridCol, axisCol) {
        const svg = document.getElementById("svg-story-class");
        if (!svg) return;

        const maxPct = 60;
        const h = 100, w = 150;
        const topY = 25, leftX = 35;

        svg.innerHTML = `
            <!-- Grid lines -->
            <line x1="${leftX}" y1="${topY}" x2="${leftX + w}" y2="${topY}" stroke="${gridCol}" stroke-dasharray="2"/>
            <line x1="${leftX}" y1="${topY + h/2}" x2="${leftX + w}" y2="${topY + h/2}" stroke="${gridCol}" stroke-dasharray="2"/>
            <line x1="${leftX}" y1="${topY + h}" x2="${leftX + w}" y2="${topY + h}" stroke="${axisCol}" stroke-width="1"/>
            <line x1="${leftX}" y1="${topY}" x2="${leftX}" y2="${topY + h}" stroke="${axisCol}" stroke-width="1"/>
            <!-- Y Axis labels -->
            <text x="${leftX - 6}" y="${topY + 3}" class="svg-story-text" text-anchor="end" fill="${textCol}">60%</text>
            <text x="${leftX - 6}" y="${topY + h/2 + 3}" class="svg-story-text" text-anchor="end" fill="${textCol}">30%</text>
            <text x="${leftX - 6}" y="${topY + h + 3}" class="svg-story-text" text-anchor="end" fill="${textCol}">0%</text>
            
            <!-- Bars representing shares: C1=24.24%, C2=20.65%, C3=55.11% -->
            <!-- C1 -->
            <rect x="${leftX + 15}" y="${topY + h - (24.24/maxPct)*h}" width="22" height="${(24.24/maxPct)*h}" fill="#0d9488" rx="2">
                <title>Class 1: 24.24% (216 rows)</title>
            </rect>
            <text x="${leftX + 26}" y="${topY + h - (24.24/maxPct)*h - 4}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">24%</text>
            <text x="${leftX + 26}" y="${topY + h + 12}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">1st</text>

            <!-- C2 -->
            <rect x="${leftX + 60}" y="${topY + h - (20.65/maxPct)*h}" width="22" height="${(20.65/maxPct)*h}" fill="#56b3a9" rx="2">
                <title>Class 2: 20.65% (184 rows)</title>
            </rect>
            <text x="${leftX + 71}" y="${topY + h - (20.65/maxPct)*h - 4}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">21%</text>
            <text x="${leftX + 71}" y="${topY + h + 12}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">2nd</text>

            <!-- C3 -->
            <rect x="${leftX + 105}" y="${topY + h - (55.11/maxPct)*h}" width="22" height="${(55.11/maxPct)*h}" fill="#334155" rx="2">
                <title>Class 3: 55.11% (491 rows)</title>
            </rect>
            <text x="${leftX + 116}" y="${topY + h - (55.11/maxPct)*h - 4}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">55%</text>
            <text x="${leftX + 116}" y="${topY + h + 12}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">3rd</text>
        `;
    }

    function renderStoryFareBoxplots(textCol, gridCol, axisCol) {
        const svg = document.getElementById("svg-story-fare");
        if (!svg) return;

        const leftX = 35;
        const w = 150;
        svg.innerHTML = `
            <!-- Axis lines -->
            <line x1="${leftX}" y1="20" x2="${leftX}" y2="135" stroke="${axisCol}"/>
            <line x1="${leftX}" y1="135" x2="${leftX + w}" y2="135" stroke="${axisCol}"/>
            <!-- X Axis ticks/labels -->
            <text x="${leftX}" y="146" class="svg-story-text" text-anchor="middle" fill="${textCol}">£0</text>
            <text x="${leftX + w/2}" y="146" class="svg-story-text" text-anchor="middle" fill="${textCol}">£100</text>
            <text x="${leftX + w}" y="146" class="svg-story-text" text-anchor="middle" fill="${textCol}">£500</text>

            <!-- C1 box plot (Y = 40) -->
            <text x="${leftX - 6}" y="44" class="svg-story-text" text-anchor="end" fill="${textCol}">1st</text>
            <line x1="${leftX + 10}" y1="40" x2="${leftX + 90}" y2="40" stroke="#0d9488" stroke-dasharray="2"/>
            <rect x="${leftX + 25}" y="30" width="45" height="20" fill="rgba(13, 148, 136, 0.2)" stroke="#0d9488" stroke-width="1" rx="1"/>
            <line x1="${leftX + 50}" y1="30" x2="${leftX + 50}" y2="50" stroke="#fbbf24" stroke-width="2"/>
            <!-- Outliers -->
            <circle cx="${leftX + 110}" cy="40" r="2" fill="#ef4444"/>
            <circle cx="${leftX + 130}" cy="40" r="2" fill="#ef4444"/>
            <circle cx="${leftX + 145}" cy="40" r="2" fill="#ef4444"/>

            <!-- C2 box plot (Y = 75) -->
            <text x="${leftX - 6}" y="79" class="svg-story-text" text-anchor="end" fill="${textCol}">2nd</text>
            <line x1="${leftX + 5}" y1="75" x2="${leftX + 45}" y2="75" stroke="#56b3a9" stroke-dasharray="2"/>
            <rect x="${leftX + 12}" y="65" width="20" height="20" fill="rgba(86, 179, 169, 0.2)" stroke="#56b3a9" stroke-width="1" rx="1"/>
            <line x1="${leftX + 22}" y1="65" x2="${leftX + 22}" y2="85" stroke="#fbbf24" stroke-width="2"/>
            <!-- Outliers -->
            <circle cx="${leftX + 55}" cy="75" r="2" fill="#ef4444"/>

            <!-- C3 box plot (Y = 110) -->
            <text x="${leftX - 6}" y="114" class="svg-story-text" text-anchor="end" fill="${textCol}">3rd</text>
            <line x1="${leftX + 2}" y1="110" x2="${leftX + 30}" y2="110" stroke="#475569" stroke-dasharray="2"/>
            <rect x="${leftX + 6}" y="100" width="14" height="20" fill="rgba(71, 85, 105, 0.2)" stroke="#475569" stroke-width="1" rx="1"/>
            <line x1="${leftX + 12}" y1="100" x2="${leftX + 12}" y2="120" stroke="#fbbf24" stroke-width="2"/>
            <!-- Outliers -->
            <circle cx="${leftX + 40}" cy="110" r="2" fill="#ef4444"/>
            <circle cx="${leftX + 48}" cy="110" r="2" fill="#ef4444"/>
        `;
    }

    function renderStoryAgeColumns(textCol, gridCol, axisCol) {
        const svg = document.getElementById("svg-story-age");
        if (!svg) return;

        const leftX = 35;
        const w = 150, h = 100;
        const topY = 25;

        svg.innerHTML = `
            <!-- Grid lines -->
            <line x1="${leftX}" y1="${topY}" x2="${leftX + w}" y2="${topY}" stroke="${gridCol}" stroke-dasharray="2"/>
            <line x1="${leftX}" y1="${topY + h/2}" x2="${leftX + w}" y2="${topY + h/2}" stroke="${gridCol}" stroke-dasharray="2"/>
            <line x1="${leftX}" y1="${topY + h}" x2="${leftX + w}" y2="${topY + h}" stroke="${axisCol}" stroke-width="1"/>
            <line x1="${leftX}" y1="${topY}" x2="${leftX}" y2="${topY + h}" stroke="${axisCol}" stroke-width="1"/>
            <!-- Y labels -->
            <text x="${leftX - 6}" y="${topY + 3}" class="svg-story-text" text-anchor="end" fill="${textCol}">100%</text>
            <text x="${leftX - 6}" y="${topY + h/2 + 3}" class="svg-story-text" text-anchor="end" fill="${textCol}">50%</text>
            <text x="${leftX - 6}" y="${topY + h + 3}" class="svg-story-text" text-anchor="end" fill="${textCol}">0%</text>

            <!-- Group 1: Children (<12) - Survival 57.35%, Deceased 42.65% -->
            <rect x="${leftX + 20}" y="${topY + h - (57.35/100)*h}" width="16" height="${(57.35/100)*h}" fill="#0d9488" rx="1">
                <title>Children Survived: 57.35% (39 kids)</title>
            </rect>
            <rect x="${leftX + 38}" y="${topY + h - (42.65/100)*h}" width="16" height="${(42.65/100)*h}" fill="#f87171" rx="1">
                <title>Children Deceased: 42.65% (29 kids)</title>
            </rect>
            <text x="${leftX + 37}" y="${topY + h + 12}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">KIDS (&lt;12)</text>
            <text x="${leftX + 37}" y="${topY + h + 22}" class="svg-story-text" style="font-size:6px" text-anchor="middle" fill="${textCol}">57% Survival</text>

            <!-- Group 2: Adults (>=12) - Survival 36.82%, Deceased 63.18% -->
            <rect x="${leftX + 90}" y="${topY + h - (36.82/100)*h}" width="16" height="${(36.82/100)*h}" fill="#0d9488" rx="1">
                <title>Adults Survived: 36.82% (303 rows)</title>
            </rect>
            <rect x="${leftX + 108}" y="${topY + h - (63.18/100)*h}" width="16" height="${(63.18/100)*h}" fill="#f87171" rx="1">
                <title>Adults Deceased: 63.18% (520 rows)</title>
            </rect>
            <text x="${leftX + 107}" y="${topY + h + 12}" class="svg-story-text" font-weight="bold" text-anchor="middle" fill="${textCol}">ADULTS (&ge;12)</text>
            <text x="${leftX + 107}" y="${topY + h + 22}" class="svg-story-text" style="font-size:6px" text-anchor="middle" fill="${textCol}">37% Survival</text>
        `;
    }

    function renderStoryCorrelationHeatmap(textCol) {
        const svg = document.getElementById("svg-story-correlation");
        if (!svg) return;

        const fields = ["Surv", "Class", "Age", "Sib", "Par", "Fare"];
        const grid = [
            [ 1.00, -0.34, -0.06, -0.04,  0.08,  0.26],
            [-0.34,  1.00, -0.34,  0.08,  0.02, -0.55],
            [-0.06, -0.34,  1.00, -0.23, -0.16,  0.10],
            [-0.04,  0.08, -0.23,  1.00,  0.41,  0.16],
            [ 0.08,  0.02, -0.16,  0.41,  1.00,  0.22],
            [ 0.26, -0.55,  0.10,  0.16,  0.22,  1.00]
        ];

        const leftX = 35;
        const topY = 20;
        const size = 18;

        let html = ``;
        
        // Render headers
        fields.forEach((f, idx) => {
            html += `
                <text x="${leftX + idx*size + size/2}" y="${topY - 6}" class="svg-story-text font-bold" text-anchor="middle" style="font-size:6.5px" fill="${textCol}">${f}</text>
                <text x="${leftX - 4}" y="${topY + idx*size + size/2 + 3}" class="svg-story-text font-bold" text-anchor="end" style="font-size:6.5px" fill="${textCol}">${f}</text>
            `;
        });

        grid.forEach((row, yIdx) => {
            row.forEach((val, xIdx) => {
                const x = leftX + xIdx * size;
                const y = topY + yIdx * size;

                let color = "rgba(255, 255, 255, 0.02)";
                let textStyle = `fill: ${textCol}`;

                if (val > 0) {
                    if (val === 1) {
                        color = "#0f766e";
                        textStyle = `fill: #ffffff; font-weight: bold;`;
                    } else {
                        color = `rgba(13, 148, 136, ${val})`;
                        textStyle = `fill: ${val > 0.4 ? "#ffffff" : textCol}; font-weight: ${val > 0.4 ? "bold" : "normal"};`;
                    }
                } else if (val < 0) {
                    const absVal = Math.abs(val);
                    color = `rgba(239, 68, 68, ${absVal})`;
                    textStyle = `fill: ${absVal > 0.4 ? "#ffffff" : textCol}; font-weight: ${absVal > 0.4 ? "bold" : "normal"};`;
                }

                html += `
                    <rect x="${x}" y="${y}" width="${size - 1}" height="${size - 1}" fill="${color}" class="svg-story-heatmap-cell" rx="1">
                        <title>Correlation: ${val.toFixed(4)}</title>
                    </rect>
                    <text x="${x + size/2}" y="${y + size/2 + 3}" class="svg-story-text font-mono" style="font-size:6px; ${textStyle}" text-anchor="middle">${val.toFixed(2)}</text>
                `;
            });
        });

        svg.innerHTML = html;
    }

    // --- Task 4 Guided Tour Click Listeners ---
    DOM.tourPrevBtn.addEventListener("click", () => {
        if (State.t4ActiveChapter > 1) {
            State.t4ActiveChapter--;
            renderStorytellingDashboard();
        }
    });

    });

    /* ==========================================================================
       8. Task 5: Predictive Modeling Laboratory Engine
       ========================================================================== */
    function renderPredictiveLab() {
        const meta = window.titanicModelMeta;
        if (!meta) {
            console.error("Titanic Model parameters not loaded.");
            return;
        }

        // Get inputs from State.t5Simulator
        const sex = State.t5Simulator.sex;
        const age = State.t5Simulator.age;
        const pclass = State.t5Simulator.pclass;
        const fare = State.t5Simulator.fare;
        const sibsp = State.t5Simulator.sibsp;
        const parch = State.t5Simulator.parch;
        const embarked = State.t5Simulator.embarked;

        // Update labels
        DOM.valSimSex.innerText = sex === "female" ? "Female" : "Male";
        DOM.valSimAge.innerText = `${age.toFixed(1)} Years`;
        DOM.valSimPclass.innerText = pclass === 1 ? "1st Class" : pclass === 2 ? "2nd Class" : "3rd Class";
        DOM.valSimFare.innerText = `£${fare.toFixed(2)}`;
        DOM.valSimSibsp.innerText = sibsp;
        DOM.valSimParch.innerText = parch;
        DOM.valSimEmbarked.innerText = embarked === "C" ? "Cherbourg" : embarked === "Q" ? "Queenstown" : "Southampton";

        // Sync input elements with State values just in case
        DOM.simSex.value = sex;
        DOM.simAge.value = age;
        DOM.simPclass.value = pclass;
        DOM.simFare.value = fare;
        DOM.simEmbarked.value = embarked;

        // Calculate normalized Age and Fare
        // Age Min/Max: [0.42, 80.00]
        // Fare Min/Max: [0.00, 512.3292]
        const age_norm = (age - 0.42) / (80.00 - 0.42);
        const fare_norm = (fare - 0.0) / (512.3292 - 0.0);

        // Feature values for equation
        const sex_val = sex === "female" ? 1 : 0;
        const emb_val = embarked === "C" ? 1 : embarked === "Q" ? 2 : 0;

        // Coefficients
        const b0 = meta.intercept;
        const bAge = meta.coefficients.Age;
        const bSex = meta.coefficients.Sex;
        const bPclass = meta.coefficients.Pclass;
        const bFare = meta.coefficients.Fare;
        const bSibSp = meta.coefficients.SibSp;
        const bParch = meta.coefficients.Parch;
        const bEmbarked = meta.coefficients.Embarked;

        // Calculate individual term contributions (Coefficient * Feature Value)
        const cAge = bAge * age_norm;
        const cSex = bSex * sex_val;
        const cPclass = bPclass * pclass;
        const cFare = bFare * fare_norm;
        const cSibSp = bSibSp * sibsp;
        const cParch = bParch * parch;
        const cEmbarked = bEmbarked * emb_val;

        // Log-odds sum z
        const z = b0 + cAge + cSex + cPclass + cFare + cSibSp + cParch + cEmbarked;

        // Logistic probability
        const prob = 1.0 / (1.0 + Math.exp(-z));
        const probPct = prob * 100;

        // Update probability display text
        DOM.simProbPct.innerText = `${probPct.toFixed(1)}%`;
        DOM.simZscoreDisplay.innerText = `Log-odds z = ${z.toFixed(4)}`;

        // Update outcome badge
        if (prob >= 0.5) {
            DOM.simOutcomeBadge.innerText = "Survived";
            DOM.simOutcomeBadge.className = "prediction-outcome-badge badge-survived";
            DOM.simGaugeCircle.className.baseVal = "circle-fill-survive";
        } else {
            DOM.simOutcomeBadge.innerText = "Did Not Survive";
            DOM.simOutcomeBadge.className = "prediction-outcome-badge badge-died";
            DOM.simGaugeCircle.className.baseVal = "circle-fill-die";
        }

        // Update gauge stroke-dashoffset (Circumference of r=70 circle is 2 * Math.PI * 70 = ~439.82 -> 440)
        const circumference = 440;
        const strokeOffset = circumference - (prob * circumference);
        DOM.simGaugeCircle.style.strokeDashoffset = strokeOffset;

        // Draw dynamic feature importance SVG
        renderSimImportance(cAge, cSex, cPclass, cFare, cSibSp, cParch, cEmbarked);

        // Draw model confusion matrix SVG
        renderSimConfusion();
    }

    function renderSimImportance(cAge, cSex, cPclass, cFare, cSibSp, cParch, cEmbarked) {
        const svg = DOM.svgSimImportance;
        if (!svg) return;

        const isDark = DOM.body.classList.contains("dark-theme");
        const textCol = isDark ? "#e2e8f0" : "#0f172a";

        const meta = window.titanicModelMeta;
        const b0 = meta.intercept;

        const data = [
            { label: "Intercept", val: b0 },
            { label: "Gender (Sex)", val: cSex },
            { label: "Age", val: cAge },
            { label: "Ticket Class", val: cPclass },
            { label: "Fare Paid", val: cFare },
            { label: "Siblings/Spouses", val: cSibSp },
            { label: "Parents/Children", val: cParch },
            { label: "Embark Port", val: cEmbarked }
        ];

        const width = 250;
        const height = 200;
        const margin = { top: 15, right: 10, bottom: 15, left: 95 };
        const chartW = width - margin.left - margin.right;
        const chartH = height - margin.top - margin.bottom;

        const centerScaleX = margin.left + chartW / 2; // X = 167.5, represents 0
        const scaleW = chartW / 2; // pixels for max value of 3.0
        const maxVal = 3.0;

        let html = `
            <!-- Center Reference Line -->
            <line x1="${centerScaleX}" y1="${margin.top}" x2="${centerScaleX}" y2="${height - margin.bottom}" stroke="${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.15)'}" stroke-width="1" />
            <text x="${centerScaleX}" y="${margin.top - 4}" class="svg-text" style="font-size:7px" text-anchor="middle" fill="${textCol}">0 (No Impact)</text>
        `;

        const barH = 12;
        const gap = 9;

        data.forEach((item, idx) => {
            const y = margin.top + idx * (barH + gap) + 4;
            
            // Calculate width and x position
            const normVal = Math.min(Math.max(item.val, -maxVal), maxVal);
            const barW = Math.abs(normVal) * (scaleW / maxVal);
            
            let barX = centerScaleX;
            let barClass = "svg-importance-bar-pos";
            if (normVal < 0) {
                barX = centerScaleX - barW;
                barClass = "svg-importance-bar-neg";
            }

            html += `
                <!-- Label -->
                <text x="${margin.left - 6}" y="${y + barH/2 + 3}" class="svg-text" style="font-size:8px; font-weight:500;" text-anchor="end" fill="${textCol}">${item.label}</text>
                
                <!-- Bar Background Track -->
                <rect x="${margin.left}" y="${y}" width="${chartW}" height="${barH}" fill="${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.02)'}" rx="2" />
                
                <!-- Active Bar -->
                <rect x="${barX}" y="${y}" width="${Math.max(barW, 0.5)}" height="${barH}" class="${barClass}" rx="2">
                    <title>${item.label}: ${item.val.toFixed(4)} log-odds impact</title>
                </rect>
                
                <!-- Numeric Value Indicator -->
                <text x="${normVal >= 0 ? barX + barW + 4 : barX - 4}" y="${y + barH/2 + 3.5}" class="svg-text font-mono" style="font-size:7px; font-weight:600;" text-anchor="${normVal >= 0 ? 'start' : 'end'}" fill="${normVal >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}">
                    ${item.val >= 0 ? '+' : ''}${item.val.toFixed(2)}
                </text>
            `;
        });

        svg.innerHTML = html;
    }

    function renderSimConfusion() {
        const svg = DOM.svgSimConfusion;
        if (!svg) return;

        const isDark = DOM.body.classList.contains("dark-theme");
        const textCol = isDark ? "#e2e8f0" : "#0f172a";

        const meta = window.titanicModelMeta;
        const tn = meta.confusionMatrix.TN;
        const fp = meta.confusionMatrix.FP;
        const fn = meta.confusionMatrix.FN;
        const tp = meta.confusionMatrix.TP;

        const cellW = 65;
        const cellH = 50;
        const gridX = 85;
        const gridY = 55;

        let html = `
            <!-- Top Heading Labels for Columns (Predicted) -->
            <text x="${gridX + cellW*2 / 2}" y="20" class="svg-text font-bold" text-anchor="middle" fill="${textCol}" style="font-size:9px; letter-spacing:0.05em;">PREDICTED OUTCOME</text>
            <text x="${gridX + cellW/2}" y="42" class="svg-text font-bold" text-anchor="middle" fill="var(--color-danger)" style="font-size:8px;">Deceased (0)</text>
            <text x="${gridX + cellW + cellW/2}" y="42" class="svg-text font-bold" text-anchor="middle" fill="var(--color-success)" style="font-size:8px;">Survived (1)</text>

            <!-- Left Heading Labels for Rows (Actual) -->
            <text x="15" y="${gridY + cellH}" class="svg-text font-bold" text-anchor="middle" fill="${textCol}" style="font-size:9px; letter-spacing:0.05em;" transform="rotate(-90 15 ${gridY + cellH})">ACTUAL HISTORICAL</text>
            <text x="${gridX - 8}" y="${gridY + cellH/2 + 3}" class="svg-text font-bold" text-anchor="end" fill="var(--color-danger)" style="font-size:8px;">Deceased (0)</text>
            <text x="${gridX - 8}" y="${gridY + cellH + cellH/2 + 3}" class="svg-text font-bold" text-anchor="end" fill="var(--color-success)" style="font-size:8px;">Survived (1)</text>

            <!-- Grid Cell (0,0) - True Negative (TN) -->
            <rect x="${gridX}" y="${gridY}" width="${cellW - 2}" height="${cellH - 2}" fill="rgba(16, 185, 129, 0.2)" class="svg-cm-cell" rx="4" stroke="var(--color-success)" stroke-width="1.5">
                <title>True Negatives (TN): ${tn} correctly predicted deceased</title>
            </rect>
            <text x="${gridX + cellW/2}" y="${gridY + cellH/2}" class="svg-text font-bold" text-anchor="middle" fill="var(--color-success)" style="font-size:16px;">${tn}</text>
            <text x="${gridX + cellW/2}" y="${gridY + cellH - 8}" class="svg-text text-muted" text-anchor="middle" style="font-size:6.5px;">Correct (TN)</text>

            <!-- Grid Cell (0,1) - False Positive (FP) -->
            <rect x="${gridX + cellW}" y="${gridY}" width="${cellW - 2}" height="${cellH - 2}" fill="rgba(239, 68, 68, 0.08)" class="svg-cm-cell" rx="4" stroke="rgba(239, 68, 68, 0.3)" stroke-width="1">
                <title>False Positives (FP): ${fp} incorrectly predicted survived (Type I Error)</title>
            </rect>
            <text x="${gridX + cellW + cellW/2}" y="${gridY + cellH/2}" class="svg-text font-bold" text-anchor="middle" fill="var(--color-danger)" style="font-size:15px; opacity:0.85;">${fp}</text>
            <text x="${gridX + cellW + cellW/2}" y="${gridY + cellH - 8}" class="svg-text text-muted" text-anchor="middle" style="font-size:6.5px;">Type I Error (FP)</text>

            <!-- Grid Cell (1,0) - False Negative (FN) -->
            <rect x="${gridX}" y="${gridY + cellH}" width="${cellW - 2}" height="${cellH - 2}" fill="rgba(239, 68, 68, 0.08)" class="svg-cm-cell" rx="4" stroke="rgba(239, 68, 68, 0.3)" stroke-width="1">
                <title>False Negatives (FN): ${fn} incorrectly predicted deceased (Type II Error)</title>
            </rect>
            <text x="${gridX + cellW/2}" y="${gridY + cellH + cellH/2}" class="svg-text font-bold" text-anchor="middle" fill="var(--color-danger)" style="font-size:15px; opacity:0.85;">${fn}</text>
            <text x="${gridX + cellW/2}" y="${gridY + cellH + cellH - 8}" class="svg-text text-muted" text-anchor="middle" style="font-size:6.5px;">Type II Error (FN)</text>

            <!-- Grid Cell (1,1) - True Positive (TP) -->
            <rect x="${gridX + cellW}" y="${gridY + cellH}" width="${cellW - 2}" height="${cellH - 2}" fill="rgba(16, 185, 129, 0.45)" class="svg-cm-cell" rx="4" stroke="var(--color-success)" stroke-width="2">
                <title>True Positives (TP): ${tp} correctly predicted survived</title>
            </rect>
            <text x="${gridX + cellW + cellW/2}" y="${gridY + cellH + cellH/2}" class="svg-text font-bold" text-anchor="middle" fill="var(--color-success)" style="font-size:16px;">${tp}</text>
            <text x="${gridX + cellW + cellW/2}" y="${gridY + cellH + cellH - 8}" class="svg-text text-muted" text-anchor="middle" style="font-size:6.5px;">Correct (TP)</text>

            <!-- Summary Text at the bottom -->
            <text x="${gridX + cellW}" y="175" class="svg-text font-bold" text-anchor="middle" fill="${textCol}" style="font-size:8px;">Accuracy: ${(meta.accuracy * 100).toFixed(2)}% | N = 179</text>
            <text x="${gridX + cellW}" y="187" class="svg-text text-muted" text-anchor="middle" style="font-size:7px;">Type I: 17 FP (9.5%) | Type II: 21 FN (11.7%)</text>
        `;

        svg.innerHTML = html;
    }

    function initPredictiveLabListeners() {
        if (!DOM.simSex) return; // safety check

        // Gender changes
        DOM.simSex.addEventListener("change", (e) => {
            State.t5Simulator.sex = e.target.value;
            renderPredictiveLab();
        });

        // Age changes
        DOM.simAge.addEventListener("input", (e) => {
            State.t5Simulator.age = parseFloat(e.target.value);
            renderPredictiveLab();
        });

        // Ticket Class changes
        DOM.simPclass.addEventListener("change", (e) => {
            State.t5Simulator.pclass = parseInt(e.target.value);
            renderPredictiveLab();
        });

        // Fare changes
        DOM.simFare.addEventListener("input", (e) => {
            State.t5Simulator.fare = parseFloat(e.target.value);
            renderPredictiveLab();
        });

        // SibSp counter increment/decrement
        DOM.simSibspDec.addEventListener("click", () => {
            if (State.t5Simulator.sibsp > 0) {
                State.t5Simulator.sibsp--;
                renderPredictiveLab();
            }
        });
        DOM.simSibspInc.addEventListener("click", () => {
            if (State.t5Simulator.sibsp < 8) {
                State.t5Simulator.sibsp++;
                renderPredictiveLab();
            }
        });

        // Parch counter increment/decrement
        DOM.simParchDec.addEventListener("click", () => {
            if (State.t5Simulator.parch > 0) {
                State.t5Simulator.parch--;
                renderPredictiveLab();
            }
        });
        DOM.simParchInc.addEventListener("click", () => {
            if (State.t5Simulator.parch < 6) {
                State.t5Simulator.parch++;
                renderPredictiveLab();
            }
        });

        // Embarked changes
        DOM.simEmbarked.addEventListener("change", (e) => {
            State.t5Simulator.embarked = e.target.value;
            renderPredictiveLab();
        });
    }

    /* ==========================================================================
       9. Startup Application Operations
       ========================================================================== */
    initPredictiveLabListeners();
    switchTask("task1");  // Initialize on Task 1 first
    switchTab("presentation-tab"); // Default view slide cover
});
