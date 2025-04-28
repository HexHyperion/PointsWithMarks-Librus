window.onload = () => {
    // Access the tables and their rows
    const tables = document.querySelectorAll("table.decorated.stretch");
    const markTable = tables[1];
    const pointTable = tables[2];

    const pointsFirstSem = new Map();
    const pointsSecondSem = new Map();

    const markTableRows = Array.from(markTable.querySelector("tbody").children).filter((row) => (
        (row.classList.contains("line0") || row.classList.contains("line1")) 
        && !row.classList.contains("bolded")
        && !row.id)
    );

    const pointTableRows = Array.from(pointTable.querySelector("tbody").children).filter((row) => (
        (row.classList.contains("line0") || row.classList.contains("line1"))
        && !row.classList.contains("bolded")
        && !row.id)
    );
    

    // Extract the points from the points table
    pointTableRows.forEach((row, index) => {
        const subjectName = row.children[1].textContent;
        const subjectMarksFirstSem = Array.from(row.children[2].children);
        const subjectMarksSecondSem = Array.from(row.children[5].children);

        if (!pointsFirstSem.has(subjectName)) {
            pointsFirstSem.set(subjectName, []);
        }
        if (!pointsSecondSem.has(subjectName)) {
            pointsSecondSem.set(subjectName, []);
        }
        
        pointsFirstSem.get(subjectName).push(...subjectMarksFirstSem);
        pointsSecondSem.get(subjectName).push(...subjectMarksSecondSem);
    });


    // Append the points to the marks table
    markTableRows.forEach((row, index) => {
        if (row.children[2].textContent == "Brak ocen") row.children[2].textContent = null;
        if (row.children[6].textContent == "Brak ocen") row.children[6].textContent = null;
        
        pointsFirstSem.get(row.children[1].textContent).forEach((mark, i) => {
            row.children[2].appendChild(mark);
        });
        pointsSecondSem.get(row.children[1].textContent).forEach((mark, i) => {
            row.children[6].appendChild(mark);
        });
    });


    // Remove the second table and its headers
    pointTable.remove();
    document.querySelectorAll("h3.center")[1].remove();
    document.querySelectorAll("div.right.screen-only")[1].remove();
    document.querySelectorAll("div.legend.left.stretch")[1].remove();
};
