/**
 *    Copyright 2016 Sven Loesekann

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
package ch.xxx.trader.usecase.mappers;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EventMapper {
	private static final Logger LOG = LoggerFactory.getLogger(EventMapper.class);
	private final ObjectMapper objectMapper;

	public EventMapper(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	public String mapDtoToString(Object dto) {
		String dtoJson;
		try {
			dtoJson = this.objectMapper.writeValueAsString(dto);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
		return dtoJson;
	}

	public <T> Optional<T> mapJsonToObject(String jsonString, Class<T> myClass) {
		Optional<T> resultOpt;
		try {
			resultOpt = Optional.ofNullable(this.objectMapper.readValue(jsonString, myClass));
		} catch (Exception e) {
			LOG.warn(String.format("Failed to deserialize %s", jsonString), e);
			resultOpt = Optional.empty();
		}
		return resultOpt;
	}
}
