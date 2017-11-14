package io.zulia.ui.shared;

import com.google.gwt.user.client.rpc.IsSerializable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Payam Meyer on 3/9/17.
 * @author pmeyer
 */
public class UIQueryResults implements IsSerializable {

	private List<IndexInfo> indexes = Collections.emptyList();
	private List<String> jsonDocs = Collections.emptyList();
	private Map<String, Map<String, Long>> facetCountsMap = Collections.emptyMap();
	private UIQueryObject uiQueryObject;
	private long totalResults;

	public UIQueryResults() {
	}

	public List<IndexInfo> getIndexes() {
		return indexes;
	}

	public void setIndexes(List<IndexInfo> indexes) {
		this.indexes = indexes;
	}

	public void addFormattedDocument(String jsonDoc) {
		if (jsonDocs.isEmpty()) {
			jsonDocs = new ArrayList<>();
		}
		jsonDocs.add(jsonDoc);
	}

	public List<String> getJsonDocs() {
		return jsonDocs;
	}

	public void addFacetCount(String fieldName, String facet, long count) {
		if (facetCountsMap.isEmpty()) {
			facetCountsMap = new HashMap<>();
		}
		facetCountsMap.computeIfAbsent(fieldName, v -> new LinkedHashMap<>()).put(facet, count);
	}

	public Map<String, Map<String, Long>> getFacetCountsMap() {
		return facetCountsMap;
	}

	public void setUiQueryObject(UIQueryObject uiQueryObject) {
		this.uiQueryObject = uiQueryObject;
	}

	public UIQueryObject getUiQueryObject() {
		return uiQueryObject;
	}

	public long getTotalResults() {
		return totalResults;
	}

	public void setTotalResults(long totalResults) {
		this.totalResults = totalResults;
	}
}
