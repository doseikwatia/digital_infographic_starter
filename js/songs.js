const topRockSongs = [
    { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
    { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
    { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
    { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
    { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
];

const topSongsSection = d3.select('#top-songs');
const cRadius = 50
const cSpacing = 30;
const svgPadding = 20;
const svgHeight = cRadius * 2 + svgPadding + 50;
const circlesScale = d3.scaleSqrt()
    .domain([0, d3.max(topRockSongs, d => d.sales_and_streams)])
    .range([0, cRadius]);

const svgWidth = (topRockSongs.length - 1) * cSpacing + topRockSongs.length * (cRadius * 2) + svgPadding * 2;

topSongsSection.append('h3')
    .text('Top Rock Songs');

const svg = topSongsSection.append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);



svg.append('line')
    .attr('y1', svgHeight / 2)
    .attr('y2', svgHeight / 2)
    .attr('x1', 0)
    .attr('x2', svgWidth)
    .attr('stroke', '#333')
    .attr('stroke-width', '2px')

const circlesChartGroups = svg.selectAll('g').data(topRockSongs)
    .join('g');

circlesChartGroups.append('circle')
    .attr('cy', svgHeight / 2)
    .attr('r', d => circlesScale(d.sales_and_streams))
    .attr('fill', '#8da0cb')
    .attr('cx', (d, i) => {
        return i * (cRadius * 2 + cSpacing) + cRadius + svgPadding;
    });

circlesChartGroups.append('text')
    .attr('x', (d, i) => i * (cRadius * 2 + cSpacing) + cRadius + svgPadding - 8 * (d.sales_and_streams / 1000000 + 'M').length / 2)
    .attr('y', 20)
    .text((d, i) => d.sales_and_streams / 1000000 + 'M');


circlesChartGroups.append('text')
    .attr('x', (d, i) => i * (cRadius * 2 + cSpacing) + cRadius + svgPadding - 8 * (d.title).length / 2)
    .attr('y', svgHeight - 10)
    .text((d, i) => d.title);


